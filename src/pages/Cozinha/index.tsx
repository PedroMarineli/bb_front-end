import { useState } from 'react';
import pedidos from '../../mocks/pedidos.json';
import { Link } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';

const Cozinha = () => {
    const { listOrder, isLoading } = useOrder()
    const [lista, setLista] = useState(pedidos);

    return (
        <div className="flex justify-between gap-24">
            <div className='grid w-full'>
                <section className="telaBranca grid gap-5 ">
                    {isLoading ? <p>Carregando...</p> : <>
                        {listOrder?.map(pedido => (
                            <div className='flex gap-14 items-start'>
                                <h2 className='text-2xl w-36'>Mesa {pedido.desk.id}</h2>
                                <div className="w-9 h-7 bg-green rounded-full"></div>
                                <ul className='w-full'>
                                {pedido.orderItems.map((item) => (
                                    <li key={item.menuItem.id}>
                                        <div className='flex justify-between'>
                                            <p>{item.menuItem.name}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                                </ul>
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
                        <div className="h-7 w-7 bg-green rounded-full"></div>
                        <p>Pronto</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="h-7 w-7 bg-yellow rounded-full"></div>
                        <p>Em andamento</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="h-7 w-7 bg-red rounded-full"></div>
                        <p>Para fazer</p>
                    </li>
                </ul>
            </section>
        </div>
    )
}
export default Cozinha;