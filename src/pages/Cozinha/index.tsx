import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { IGetOrder } from '../../interface/IOrder';
import { useOrderMutate } from '../../hooks/useOrderMutate';
import lataLixo from "../../../public/icons/lata-de-lixo.png";

const Cozinha = () => {
    const { listOrder, isLoading, refetch } = useOrder()
    const { putOrderMutate, deleteMutate } = useOrderMutate()
    const [newOrderStatus, setNewOrderStatus] = useState("")

    // const statusPedido = (status: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED") => {
    //     if(status === "CREATED") setNewOrderStatus("PREPARING")
    //     else if(status === "PREPARING") setNewOrderStatus("FINISHED")

    //     const orderStatus = newOrderStatus

    //     const orderData: IListOrders = {
    //         orderStatus
    //     }
    //     console.log(orderData)
    //     //putOrderMutate.mutate(orderData)
    //     refetch()
    // }

    const statusPedido = (status: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED") => {
        let newStatus: "PREPARING" | "FINISHED" | "CANCELED" | "CREATED" | undefined = undefined

        if(status === "CREATED") newStatus = "PREPARING"
        else if(status === "PREPARING") newStatus = "FINISHED"
        else if(status === "FINISHED") {
            console.log("Pedido finalizado")
            return
        } else if(status === "CANCELED") {
            console.log("Pedido cancelado")
            return
        }

        if(newStatus) {
            setNewOrderStatus(newStatus)
            const orderData: IGetOrder = {
                orderStatus: newStatus
            }
            console.log(orderData)
            //putOrderMutate.mutate(orderData)
            refetch()
        }
    }

    const excluirOrder = (id: any) => {
        deleteMutate.mutate(id)
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
        <div className="flex justify-between gap-24">
            <div className='grid w-full'>
                <section className="telaBranca grid gap-5 ">
                    {isLoading ? <p>Carregando...</p> : <>
                        {listOrder?.map(pedido => (
                            <div className='flex gap-14 items-start' key={pedido.id}>
                                <h2 className='text-2xl w-36'>Mesa {pedido.desk?.id}</h2>
                                <div onClick={() => pedido.orderStatus && statusPedido(pedido.orderStatus)} className={`w-10 h-7 rounded-full ${getStatusColor(pedido.orderStatus)}`}></div>
                                <ul className='w-full'>
                                    {pedido.orderItems?.map((item) => (
                                        <li key={item.menuItem.id}>
                                            <div className='flex justify-between'>
                                                <p>{item.menuItem.name}</p>
                                                <p>{item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {pedido.orderStatus === "CREATED" && 
                                    <div onClick={() => excluirOrder(pedido.id)}>
                                        <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                                    </div>
                                }
                            </div>
                        ))}
                    </>}
                </section>
                <button className="pt-5 text-right">
                    <Link to='/bb-cadastro-pedidos'>Alterar Pedido</Link>
                </button>
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
    )
}

export default Cozinha;