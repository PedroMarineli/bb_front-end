import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { IGetOrder } from '../../interface/IOrder';
import { useOrderMutate } from '../../hooks/useOrderMutate';
import { deleteState } from '../../state/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import lataLixo from "../../../public/icons/lata-de-lixo.png";
import Avisos from '../../components/Avisos';

const Cozinha = () => {
    const navigate = useNavigate();
    const { listOrder, isLoading, refetch } = useOrder()
    const { putOrderMutate, deleteMutate } = useOrderMutate()
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
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
                    <section className="telaBranca grid gap-5 ">
                        {isLoading ? <p>Carregando...</p> : <>
                            {listOrder?.map(pedido => (
                                <>
                                    {pedido.orderStatus !== "DELIVERED" &&
                                        <div className='flex gap-14 items-start' key={pedido.id}>
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
                                                        {pedido.description &&
                                                            <div className='grid gap-7'>
                                                                <h2 className='text-2xl text-center pt-7'>Observações:</h2>
                                                                <span className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"></span>
                                                            </div>
                                                        }
                                                    </li>
                                                ))}
                                            </ul>
                                            {pedido.orderStatus === "CREATED" &&
                                                <div>
                                                    <div onClick={() => corfirmaExcluir(pedido.id)}>
                                                        <img src={lataLixo} alt="Lata de lixo" className='w-8 cursor-pointer'/>
                                                    </div>
                                                    <button className="pt-5 text-right" onClick={() => navigate('/bb-alterar-pedido', { state: { pedido } })}> Alterar </button>
                                                </div>
                                            }
                                        </div>
                                    }
                                </>
                            ))}
                        </>}
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
