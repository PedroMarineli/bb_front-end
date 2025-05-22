import { useEffect, useMemo, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { useOrderMutate } from "../../hooks/useOrderMutate";
import Botao from "../../components/Botao";
import opcoes from "../../json/opcoesPagamento.json";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { deleteState } from "../../state/atom";
import Avisos from "../../components/Avisos";
import { IGetOrder } from "../../interface/IOrder";

interface OpcaoPagamento {
  id: number
  pagamento: string
  metodo: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT_CARD"
}

const Caixa = () => {
    const { listOrder, isLoading } = useOrder()
    const [orders, setOrders] = useState<number | null>(null)
    const [ordersDisponiveis, setOrdersDisponiveis] = useState<number[]>([])
    const { postOrderFinished } = useOrderMutate()
    const deleteFechado = useRecoilValue(deleteState)
    const deleteAberto = useSetRecoilState(deleteState)
    const [metodoPag, setMetodoPag] = useState<OpcaoPagamento['metodo']>("CASH")
    const opcoesPagamento = opcoes as OpcaoPagamento[]
    const { putOrderMutate, deleteMutate } = useOrderMutate()
    const [pedidoIdParaFinalizar, setPedidoIdParaFinalizar] = useState<number | null>(null)

    // '?? []' -> garante que listOrder seja um array, mesmo se for undefined ou null inicialmente
    const deliveredOrders = listOrder?.filter(pedido => pedido.orderStatus === "DELIVERED") ?? []

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                if(deliveredOrders) {
                    const ids = deliveredOrders
                    .map(order => order.desk?.id)
                    .filter((desk): desk is number => desk !== undefined)
                    .sort((a, b) => a - b)

                    setOrdersDisponiveis(ids)

                    if(ids.length > 0 && orders === null) {
                        setOrders(ids[0])
                    }
                } else {
                    console.log('Erro ao buscar mesas disponíveis.')
                }
            } catch (error: any) {
                console.log('Erro ao buscar mesas: ' + error.message)
            }
        }
        fetchOrders()
    }, [deliveredOrders])

    const avancarOrder = () => {
        if (orders !== null && ordersDisponiveis.length > 0) {
          const currentIndex = ordersDisponiveis.indexOf(orders)
          if (currentIndex < ordersDisponiveis.length - 1) {
            setOrders(ordersDisponiveis[currentIndex + 1])
          }
        }
    }
    
    const retrocederOrder = () => {
        if (orders !== null && ordersDisponiveis.length > 0) {
          const currentIndex = ordersDisponiveis.indexOf(orders)
          if (currentIndex > 0) {
            setOrders(ordersDisponiveis[currentIndex - 1])
          }
        }
    }

    const pedidoSelecionado = useMemo(() => {
        return deliveredOrders?.find(pedido => pedido.desk?.id === orders)
    }, [deliveredOrders, orders])

    const corfirmaFinalizacao = (e: React.FormEvent, id: any, status: any, deskId: any) => {
        e.preventDefault()
        setPedidoIdParaFinalizar(id)
        deleteAberto(true)
        const paymentMethod: IGetOrder = {
            id: id,
            orderStatus: status,
            desk: {id: deskId},
            paymentMethod: metodoPag
        }
        putOrderMutate.mutate(paymentMethod)
    }

    const completedOrder = () => {
        if (pedidoIdParaFinalizar) {
            postOrderFinished.mutate(pedidoIdParaFinalizar, {
                onSuccess: () => {
                    deleteMutate.mutate(pedidoIdParaFinalizar)
                }
            })
        }
    }

    return (
        <section className="telaBranca grid gap-10">
            <div className="flex justify-center gap-2">
                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={retrocederOrder} disabled={orders === null || orders === ordersDisponiveis[0]}>-</button>
                <span className='text-2xl'>Mesa {orders !== null ? orders : 'Selecione'}</span>
                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={avancarOrder} disabled={orders === null || orders === ordersDisponiveis[ordersDisponiveis.length - 1]}>+</button>
            </div>
            {isLoading ? <p>Carregando...</p> : pedidoSelecionado && (                    
                <div className='grid gap-10 text-center'>
                    <table className="text-center w-full">
                        <thead>
                            <tr>
                                <th>Item(ns)</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidoSelecionado.orderItems?.map((item) => (
                                <tr key={item.menuItem?.id}>
                                    <td>{item.menuItem?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.menuItem?.price?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total: R${pedidoSelecionado.totalValue?.toFixed(2)}</p>
                </div>)
            }
            <form className="flex items-center justify-around" onSubmit={(e) => corfirmaFinalizacao(e, pedidoSelecionado?.id, pedidoSelecionado?.orderStatus, pedidoSelecionado?.desk?.id)}>
                <div className="grid gap-2">
                    <p className="pl-6">Opções de pagamento:</p>
                    <ul className="grid gap-1">
                        {opcoesPagamento.map((opcao: OpcaoPagamento) => (
                            <li key={opcao.id} className="flex items-center gap-2">
                                <input
                                    type="radio" 
                                    name="metodo" 
                                    className="w-6 h-6 bg-transparent border-black rounded-2xl hover:ring-black"
                                    checked={metodoPag === opcao.metodo}
                                    onChange={() => setMetodoPag(opcao.metodo)}
                                />
                                {opcao.pagamento}
                            </li>
                        ))}
                    </ul>
                </div>
                <button>
                    <Botao>Finalizar Pedido</Botao>
                </button>
            </form>
            { deleteFechado && <Avisos title="Finalizar Pedido" text={(
                <div className='grid gap-8 justify-center'>
                    <p>Pedido a ser finalizado?! Deseja mesmo realizar essa ação?!.</p>
                    <button onClick={completedOrder}>Finalizar</button>
                </div>
            )}/> }
        </section>
    )
}

export default Caixa
