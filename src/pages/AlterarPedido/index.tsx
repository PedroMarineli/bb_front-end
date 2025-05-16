import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useMenuItem } from "../../hooks/useMenuItem";
import { IGetOrder, IUpdateOrder } from "../../interface/IOrder";
import { useOrderMutate } from "../../hooks/useOrderMutate";
import { IMenuItem } from "../../interface/IMenu";
import Botao from "../../components/Botao";
import Avisos from "../../components/Avisos";
import MenuItemCard from "../../components/MenuItemCard";

const AlterarPedido = () => {
    const { data, isLoading, refetch } = useMenuItem()
    const { postOrderItemMutate } = useOrderMutate()
    const [description, setDescription] = useState("")
    const [quantidade, setQuantidade] = useState<{ [itemId: number]: number }>({})
    const [items, setItems] = useState<IMenuItem[]>([])
    const categorias: { [categoria: string]: IMenuItem[] } = {}
    //const navigate = useNavigate()
    const fechado = useRecoilValue(menuState)
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }


    const location = useLocation();
    const { pedido } = location.state as { pedido: IGetOrder }

    console.log(pedido)

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
    
    const submitChange = () => {    
        for (const itemId in quantidade) {
            const quantity = quantidade[parseInt(itemId)]
            if (quantity > 0) {
                const menuItem = data?.content.find((item) => item.id === parseInt(itemId))
                if (menuItem) {
                    const updateOrder: IUpdateOrder = {
                        id,
                        quantity,
                        menuItem,
                        order: { id: pedido.id }
                    }
                    postOrderItemMutate.mutate(updateOrder)
                }
            }
        }    
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

    return (
        <div>
            <section className="telaBranca grid gap-5">
                <div className="flex justify-center items-center gap-3">
                    <span>Mesa {pedido.desk?.id}</span>
                </div>
                <div>
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
                            <button onClick={submitChange}><Botao>Salvar Alteração</Botao></button>
                        </div>
                    </div>
                </div>
            </section>
            { fechado && <Avisos title="Pedido Alterado" text={<p>Pedido alterado com sucesso!</p>}/> }
        </div>
    )
}

export default AlterarPedido;
