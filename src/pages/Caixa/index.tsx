import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import { useOrder } from "../../hooks/useOrder";

const Caixa = () => {
    const { listOrder, isLoading } = useOrder()
    const [orders, setOrders] = useState<number | null>(null)
    const [ordersDisponiveis, setOrdersDisponiveis] = useState<number[]>([])
    const [errorOrders, setErrorOrders] = useState<string | null>(null)

    const opcoes = [
        { pagamento: "Dinheiro" },
        { pagamento: "Pix" },
        { pagamento: "Cartão de Crédito" },
        { pagamento: "Cartão de Débito" }
    ]

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                if(listOrder) {
                    const ids = listOrder
                    .map(order => order.desk?.id)
                    .filter((desk): desk is number => desk !== undefined)
                    .sort((a, b) => a - b)

                    setOrdersDisponiveis(ids)

                    if(ids.length > 0 && orders === null) {
                        setOrders(ids[0])
                    }
                } else {
                    setErrorOrders('Erro ao buscar mesas disponíveis.')
                }
            } catch (error: any) {
                setErrorOrders('Erro ao buscar mesas: ' + error.message)
            }
        }
        fetchOrders()
    }, [listOrder])

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

    const pedidoSelecionado = listOrder?.find(pedido => pedido.desk?.id === orders);

    return (
        <section className="telaBranca grid gap-10">
            <div className="flex justify-center">
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
                                <tr key={item.menuItem.id}>
                                    <td>{item.menuItem.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.menuItem.price?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total: R${pedidoSelecionado.totalValue?.toFixed(2)}</p>
                </div>)
            }
            <div className="flex items-center justify-around">
                <div className="grid gap-2">
                    <p className="pl-6">Opções de pagamento:</p>
                    <ul className="grid gap-1">
                        {opcoes.map((opcao) => (
                            <li className="flex items-center gap-2">
                                <input type="checkbox" className="w-6 h-6 bg-transparent border-black rounded-2xl hover:ring-black"/>
                                {opcao.pagamento}
                            </li>
                        ))}
                    </ul>
                </div>
                <Botao children="Finalizar Pedido"/>
            </div>
        </section>
    )
}
export default Caixa;