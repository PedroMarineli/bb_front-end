import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Botao from "../../components/Botao";
import PedidoEnviado from "../../components/PedidoEnviado";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useMenuItem } from "../../hooks/useMenuItem";
import { useDesk } from "../../hooks/useDesk";
import { ICreateOrder, ICreateOrderItem, IListOrders } from "../../interface/IOrder";
import { useOrderMutate } from "../../hooks/useOrderMutate";
import { IMenuItem } from "../../interface/IMenu";
import { useOrder } from "../../hooks/useOrder";

const MenuItemCard = memo(({ item, quantidade, decrementQuantity, incrementQuantity }: {
    item: IMenuItem;
    quantidade: number;
    decrementQuantity: (id: number | undefined) => void;
    incrementQuantity: (id: number | undefined) => void;
  }) => {
    return (
        <div className='flex items-center gap-8' key={item.id}>
        <div className="flex">
            <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => decrementQuantity(item.id)}>-</button>
            <span>{quantidade || 0}</span>
            <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => incrementQuantity(item.id)}>+</button>
        </div>
        <p>{item.name}: {item.category}</p>
    </div>
    );
});

const CadastroDePedidos = () => {
    const { data, isLoading, refetch } = useMenuItem()
    const { mesas } = useDesk()
    const { postOrderMutate, postOrderItemMutate } = useOrderMutate()
    const { listOrder } = useOrder()
    const [totalValue, setTotalValue] = useState(50)
    const [mesasDisponiveisIds, setMesasDisponiveisIds] = useState<number[]>([])
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null)
    const [paymentMethod] = useState<ICreateOrder["paymentMethod"]>("CASH")
    const [orderStatus] = useState<ICreateOrder["orderStatus"]>("CREATED")
    const [isLoadingMesas, setIsLoadingMesas] = useState(true)
    const [errorMesas, setErrorMesas] = useState<string | null>(null)
    const [quantidade, setQuantidade] = useState<{ [itemId: number]: number }>({})
    const [orderToCompare, setOrderToCompare] = useState<IListOrders>()
    const fechado = useRecoilValue(menuState)
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    
    useEffect(() => {
        const fetchMesasDisponiveis = async() => {
            setIsLoadingMesas(true)
            setErrorMesas(null)
            try {
                if (mesas?.content) { // Filtra apenas os IDs das mesas não preenchidas (se necessário)
                    const ids = mesas?.content
                    .filter(mesa => mesa.filled === false) // Mantém não preenchidas ou com 'filled' indefinido
                    .map(mesa => mesa.id)
                    .filter((id): id is number => id !== undefined) // Garante que não há undefined
                    .sort((a, b) => a - b) // Ordena os IDs
                    
                    setMesasDisponiveisIds(ids);
                    if (ids.length > 0 && mesaSelecionada === null) {
                        setMesaSelecionada(ids[0]);
                    }
                } else {
                    setErrorMesas('Erro ao buscar mesas disponíveis.')
                }
            } catch (error: any) {
                setErrorMesas('Erro ao buscar mesas: ' + error.message)
            } finally {
                setIsLoadingMesas(false)
            }
        };
        fetchMesasDisponiveis()
    }, [mesas])
    
    useEffect(() => {
        if (listOrder && mesaSelecionada) {
            const foundOrder = listOrder.find(order => order.desk?.id === mesaSelecionada);
            setOrderToCompare(foundOrder);
        }
    }, [listOrder, mesaSelecionada]);
    
    const submitOrder = () => {
        const itemsToAdd: ICreateOrderItem[] = [];

        for (const itemId in quantidade) {
            const quantity = quantidade[parseInt(itemId)];
            if (quantity > 0) {
                const menuItem = data?.items?.find((item) => item.id === parseInt(itemId));
                if (menuItem) {
                itemsToAdd.push({ menuItem: { id: menuItem.id }, quantity, order: { id: orderToCompare?.id } });
                }
            }
        }

        // if (!mesaSelecionada) {
        //     alert('Por favor, selecione uma mesa.');
        //     return;
        // }

        // if (createOrderItem.length === 0) {
        //     alert('Por favor, adicione itens ao pedido.');
        //     return;
        // }
        
        refetch()
        console.log(itemsToAdd)
        //postOrderItemMutate.mutate(itemsToAdd)
    }

    const submeterOrder = () => {
        const createOrder: ICreateOrder = {
            totalValue,
            paymentMethod, 
            orderStatus,
            desk: { id: mesaSelecionada }
        }
        postOrderMutate.mutate(createOrder)
        refetch()
    }

    const incrementQuantity = (itemId: any) => {
        setQuantidade((prevQuantidades) => ({
        ...prevQuantidades,
        [itemId]: (prevQuantidades[itemId] || 0) + 1,
        }))
    }
  
    const decrementQuantity = (itemId: any) => {
        setQuantidade((prevQuantidades) => ({
        ...prevQuantidades,
        [itemId]: Math.max(0, (prevQuantidades[itemId] || 0) - 1), // Garante que não seja negativo
        }))
    }

    const avancarMesa = () => {
        if (mesaSelecionada !== null && mesasDisponiveisIds.length > 0) {
          const currentIndex = mesasDisponiveisIds.indexOf(mesaSelecionada)
          if (currentIndex < mesasDisponiveisIds.length - 1) {
            setMesaSelecionada(mesasDisponiveisIds[currentIndex + 1])
          }
        }
    }
    
    const retrocederMesa = () => {
        if (mesaSelecionada !== null && mesasDisponiveisIds.length > 0) {
          const currentIndex = mesasDisponiveisIds.indexOf(mesaSelecionada)
          if (currentIndex > 0) {
            setMesaSelecionada(mesasDisponiveisIds[currentIndex - 1])
          }
        }
    }

    return (
        <div>
            <section className="telaBranca">
                <div className="flex justify-center">
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={retrocederMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[0]}>-</button>
                    <span>Mesa {mesaSelecionada !== null ? mesaSelecionada : 'Selecione'}</span>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={avancarMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[mesasDisponiveisIds.length - 1]}>+</button>
                </div>
                <button onClick={submeterOrder}>Fazer Pedido</button>
                {isLoading ? <p>Carregando...</p> : <>
                    {data?.items?.map((item) => 
                        <MenuItemCard
                            key={item.id}
                            item={item}
                            quantidade={quantidade[item.id] || 0}
                            incrementQuantity={incrementQuantity}
                            decrementQuantity={decrementQuantity}
                        />
                    )}
                </>}
                <div className='grid gap-7'>
                    <h2 className='text-2xl text-center pt-7'>Observações:</h2>
                    <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"/>
                    <div className="flex justify-center" onClick={alterarStatus}>
                        <button onClick={submitOrder}><Botao>Enviar para a cozinha</Botao></button>
                    </div>
                </div>
            </section>
            <button className="pt-5 text-right">
                <Link to='/bb-alterar-cardapio'>Alterar Cardápio</Link>
            </button>
            { fechado && <PedidoEnviado/>}
        </div>
    )
}

export default CadastroDePedidos;

{/* <section className="telaBranca">
<div className="flex justify-center">
    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">-</button>
    <input type="text" className="bg-transparent w-36 text-center text-2xl" value="Mesa 10"/>
    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
</div>
{lista.map(categoria => (
    <div className='grid gap-5'>
        <h2 className='text-2xl text-center pt-7'>{categoria.nome}:</h2>
        <ul className='grid gap-3'>
        {categoria.itens.map((item) => (
            <li key={item.nome}>
                <div className='flex items-center gap-8'>
                    <div className="flex">
                        <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">-</button>
                        <input type="text" className="bg-transparent w-12 text-center" value="0"/>
                        <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                    </div>
                    <p>{item.nome}: {item.descricao}</p>
                </div>
            </li>
        ))}
        </ul>
    </div>
))}
<div className='grid gap-7'>
    <h2 className='text-2xl text-center pt-7'>Observações:</h2>
    <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"/>
    <div className="flex justify-center" onClick={alterarStatus}>
        <Botao>Enviar para a cozinha</Botao>
    </div>
</div>
</section> */}