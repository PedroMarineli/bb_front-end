import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { IGetOrder } from '../../interface/IOrder';
import { useOrderMutate } from '../../hooks/useOrderMutate';
import { deleteState } from '../../state/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import lataLixo from "../../../public/icons/lata-de-lixo.png";
import alterar from "../../../public/icons/alterar.png";
import Avisos from '../../components/Avisos';

const Cozinha = () => {
    const navigate = useNavigate();
    const { listOrder, isLoading, refetch } = useOrder()
    const { putOrderMutate, deleteMutate } = useOrderMutate()
    const [itemToDeleteId, setItemToDeleteId] = useState(null)
    const deleteFechado = useRecoilValue(deleteState)
    const deleteAberto = useSetRecoilState(deleteState)

    const statusPedido = (status: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED" | "DELIVERED", id: any, deskId: any) => {
        let newStatus: "PREPARING" | "FINISHED" | "CANCELED" | "CREATED" | "DELIVERED" | undefined = undefined

        if(status === "CREATED") newStatus = "PREPARING"
        else if(status === "PREPARING") newStatus = "FINISHED"
        else if(status === "FINISHED") newStatus = "DELIVERED"
        else if(status === "CANCELED") {
            console.log("Pedido cancelado")
            return
        }

        if(newStatus) {
            const orderData: IGetOrder = {
                id: id,
                orderStatus: newStatus,
                desk: {id: deskId}
            }
            putOrderMutate.mutate(orderData, {
                onSuccess: () => {
                    refetch()
                },
                onError: (error) => {
                    console.error("Erro ao atualizar status do pedido:", error)
                }
            })
        }
    }

    useEffect(() => {
        refetch()
    }, [])

    const corfirmaExcluir = (id: any) => {
        deleteAberto(true)
        setItemToDeleteId(id)
    }

    const excluirOrder = (id: any) => {
        deleteMutate.mutate(id, {
            onSuccess: () => {
                deleteAberto(false)
                setItemToDeleteId(null)
                refetch()
            },
            onError: (error) => {
                console.error("Erro ao excluir pedido:", error)
            }
        })
    }

    const getStatusColor = (status: any) => {
        switch(status) {
          case 'CREATED': return 'bg-red-600'
          case 'PREPARING': return 'bg-yellow-500'
          case 'FINISHED': return 'bg-green-600'
          default: return 'bg-gray-400'
        }
    }

    return (
        <div>
            <div className="flex justify-between gap-10">
                <div className='grid w-full'>
                    <section className="telaBranca grid gap-5">
                        {isLoading ? (
                            <p>Carregando...</p>
                        ) : (
                            listOrder?.length > 0 ? (
                                listOrder.map(pedido => (
                                    <ul>
                                        {pedido.orderStatus !== "DELIVERED" &&
                                            <li className='flex gap-10 items-center' key={pedido.id}>
                                                <div className='grid gap-5 items-center w-full'>
                                                    <div className='flex gap-10'>
                                                        <div className='flex'>
                                                            <h2 className='text-2xl w-28'>Mesa {pedido.desk?.id}</h2>
                                                            <div onClick={() => pedido.orderStatus && statusPedido(pedido.orderStatus, pedido.id, pedido.desk?.id)} className={`cursor-pointer w-8 h-8 rounded-full ${getStatusColor(pedido.orderStatus)}`}></div>
                                                        </div>
                                                        <ul className='w-full'>
                                                            {pedido.orderItems?.map((item) => (
                                                                <li key={item.menuItem?.id}>
                                                                    <div className='flex justify-between'>
                                                                        <p>{item.menuItem?.name}</p>
                                                                        <p>{item.quantity}</p>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {pedido.description &&
                                                        <div className='grid gap-7'>
                                                            <span className="px-5 py-2 bg-transparent w-full border-solid border-2 rounded-lg border-black">{pedido.description}</span>
                                                        </div>
                                                    }
                                                </div>
                                                {(pedido.orderStatus === "CREATED" || pedido.orderStatus === null) &&
                                                    <div className='flex gap-5'>
                                                        <div onClick={() => corfirmaExcluir(pedido.id)}>
                                                            <img src={lataLixo} alt="Lata de lixo" className='w-10 cursor-pointer'/>
                                                        </div>
                                                        <div onClick={() => navigate('/bb-alterar-pedido', { state: { pedido } })}>
                                                            <img src={alterar} alt="Alterar" className='w-10 cursor-pointer'/>
                                                        </div >
                                                    </div>
                                                }
                                            </li>
                                        }
                                        {pedido.orderStatus == "DELIVERED" && <p>Não há pedidos na fila de montagem.</p> }
                                    </ul>
                                ))
                            ) : (
                                <p>Não há pedidos na fila de montagem.</p>
                            )
                        )}
                    </section>
                </div>
                <section className="telaBranca p-10 w-80 h-48">
                    <ul className="grid gap-3">
                        <li className="flex gap-4">
                            <div className="h-7 w-7 bg-green-600 rounded-full"></div>
                            <p>Pronto</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="h-7 w-7 bg-yellow-300 rounded-full"></div>
                            <p>Em andamento</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="h-7 w-7 bg-red-500 rounded-full"></div>
                            <p>Para fazer</p>
                        </li>
                    </ul>
                </section>
            </div>
            { deleteFechado && <Avisos title="Excluir Pedido" text={(
                <div className='grid gap-8 justify-center'>
                    <p>Tem certeza que quer excluir?! Essa ação não terá mais volta.</p>
                    <button onClick={() => itemToDeleteId !== null && excluirOrder(itemToDeleteId)}>Excluir</button>
                </div>
            )}/> }
        </div>
    )
}

export default Cozinha
