import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Botao from "../../components/Botao";
import PedidoEnviado from "../../components/PedidoEnviado";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useMenuItem } from "../../hooks/useMenuItem";
import { useDesk } from "../../hooks/useDesk";
import { ICreateOrder, IPostOrderItem, IGetOrder, OrderItems } from "../../interface/IOrder";
import { useOrderMutate } from "../../hooks/useOrderMutate";
import { useOrder } from "../../hooks/useOrder";
import MenuItemCard from "./MenuItemCard";
import { IMenuItem } from "../../interface/IMenu";

const CadastroDePedidos = () => {
    const { data, isLoading, refetch } = useMenuItem()
    const { mesas } = useDesk()
    //const { postOrderMutate, postOrderItemMutate } = useOrderMutate()
    const { listOrder } = useOrder()
    const [totalValue, setTotalValue] = useState(50)
    const [mesasDisponiveisIds, setMesasDisponiveisIds] = useState<number[]>([])
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null)
    // const [paymentMethod] = useState<ICreateOrder["paymentMethod"]>("CASH")
    // const [orderStatus] = useState<ICreateOrder["orderStatus"]>("CREATED")
    const [description, setDescription] = useState("")
    const [isLoadingMesas, setIsLoadingMesas] = useState(true)
    const [errorMesas, setErrorMesas] = useState<string | null>(null)
    const [quantidade, setQuantidade] = useState<{ [itemId: number]: number }>({})
    const [orderToCompare, setOrderToCompare] = useState<IGetOrder | undefined>(undefined)
    const [ativado, setAtivado] = useState(false)
    const fechado = useRecoilValue(menuState)
    const aberto = useSetRecoilState(menuState)
    const [items, setItems] = useState<IMenuItem[]>([])
    const categorias: { [categoria: string]: IMenuItem[] } = {}
    const alterarStatus = () => {
        aberto(true)
    }
    
    console.log(listOrder)

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
        if (data?.content) {
            setItems(data.content); 
        }
    }, [data?.content])

    items.forEach(item => {
        if (!categorias[item.category]) {
            categorias[item.category] = [];
        }
        categorias[item.category].push(item);
    })
    
    // useEffect(() => {
    //     if (listOrder && mesaSelecionada) {
    //         let foundOrder: IGetOrder | undefined
    //         for (let i = 0; i < listOrder.length; i++) {
    //             const order = listOrder[i]
    //             if (order.desk?.id === mesaSelecionada) {
    //                 foundOrder = order
    //                 break
    //             }
    //         }
    //         setOrderToCompare(foundOrder)
    //     }
    // }, [listOrder, mesaSelecionada]);

    useEffect(() => {
        if (listOrder && mesaSelecionada) {
            const foundOrder = listOrder.find(order => order.desk?.id === mesaSelecionada)
            setOrderToCompare(foundOrder || undefined)
        }
    }, [listOrder, mesaSelecionada]);

    console.log(orderToCompare)

    // const submitOrder = () => {
    //     if (!orderToCompare) {
    //         console.error('Nenhum pedido encontrado para a mesa selecionada');
    //         return;
    //     }

    //     const itemsToAdd: IPostOrderItem[] = [];

    //     console.log(orderToCompare)

    //     for (const itemId in quantidade) {
    //         const quantity = quantidade[parseInt(itemId)];
    //         if (quantity > 0) {
    //             const menuItem = data?.content.find((item) => item.id === parseInt(itemId));
    //             if (menuItem) {
    //                 itemsToAdd.push({ quantity, menuItem: menuItem, order: orderToCompare});
    //             }
    //         }
    //     }

    //     // if (!mesaSelecionada) {
    //     //     alert('Por favor, selecione uma mesa.');
    //     //     return;
    //     // }

    //     // if (createOrderItem.length === 0) {
    //     //     alert('Por favor, adicione itens ao pedido.');
    //     //     return;
    //     // }
    //     setAtivado(!ativado)
    //     refetch()
    //     console.log(itemsToAdd, description)
    //     //postOrderItemMutate.mutate(itemsToAdd, description)
    // }
    
    const submitOrder = () => {
        if (!orderToCompare) {
            console.error('Nenhum pedido encontrado para a mesa selecionada');
            return;
        }

        const itemsToAdd: IPostOrderItem[] = []

        console.log(orderToCompare)

        for (const itemId in quantidade) {
            const quantity = quantidade[parseInt(itemId)];
            if (quantity > 0) {
                const menuItem = data?.content.find((item) => item.id === parseInt(itemId));
                if (menuItem) {
                    itemsToAdd.push({
                        quantity,
                        menuItem,
                        order: {
                            id: orderToCompare.id || 0
                        }
                    });
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
        setAtivado(!ativado)
        refetch()
        console.log(itemsToAdd, description)
        //postOrderItemMutate.mutate(itemsToAdd, description)
    }

    const submeterOrder = () => {
        const createOrder: ICreateOrder = {
            desk: { id: mesaSelecionada },
            description
        }

        console.log(createOrder)
        //postOrderMutate.mutate(createOrder)
        setAtivado(!ativado)
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
            <section className="telaBranca grid gap-5">
                <div className="flex justify-center items-center gap-3">
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={retrocederMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[0]}>-</button>
                    <span>Mesa {mesaSelecionada !== null ? mesaSelecionada : 'Selecione'}</span>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={avancarMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[mesasDisponiveisIds.length - 1]}>+</button>
                </div>
                <button onClick={submeterOrder} className="justify-center">Fazer Pedido</button>
                <div className={`${ativado ? 'opacity-100' : 'opacity-55 pointer-events-none'}`}>
                    {isLoading ? <p>Carregando...</p> : <div className="grid gap-5">
                        {Object.keys(categorias).map(categoria => (
                            <div key={categoria} className='grid gap-3'>
                                <h2 className='text-2xl justify-center'>{categoria}</h2>
                                <ul className='grid gap-2'>
                                    {categorias[categoria].map(item => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            quantidade={quantidade[item.id] || 0}
                                            incrementQuantity={incrementQuantity}
                                            decrementQuantity={decrementQuantity}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>}
                    <div className='grid gap-7'>
                        <h2 className='text-2xl text-center pt-7'>Observações:</h2>
                        <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black" onChange={(e) => setDescription(e.target.value)}/>
                        <div className="flex justify-center" onClick={alterarStatus}>
                            <button onClick={submitOrder}><Botao>Enviar para a cozinha</Botao></button>
                        </div>
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
