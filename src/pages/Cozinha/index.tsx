import { useState } from 'react';
import pedidos from '../../mocks/pedidos.json';
import { Link } from 'react-router-dom';

const Cozinha = () => {
    const [lista, setLista] = useState(pedidos);

    return (
        <div className="flex justify-between gap-24">
            <div className='grid w-full'>
                <section className="telaBranca grid gap-5 ">
                    {lista.map(pedido => (
                            <div className='flex gap-14 items-start'>
                                <h2 className='text-2xl w-28'>Mesa {pedido.mesa}</h2>
                                <div className="w-9 h-7 bg-green rounded-full"></div>
                                <ul className='w-full'>
                                {pedido.itens.map((item) => (
                                    <li key={item.nome}>
                                        <div className='flex justify-between'>
                                            <p>{item.nome}</p>
                                            <p>{item.quantidade}</p>
                                        </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        ))}
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