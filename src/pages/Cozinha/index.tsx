import { useState } from 'react';
import pedidos from '../../mocks/pedidos.json';

const Cozinha = () => {
    const [lista, setLista] = useState(pedidos);

    return (
        <div className="flex justify-between gap-24">
            <section className="telaBranca grid gap-5 w-full">
                {lista.map(pedido => (
                        <div className='flex gap-5 items-start w-full'>
                            <h2 className='text-2xl'>Mesa {pedido.mesa}</h2>
                            <div className="h-7 w-7 bg-green rounded-full"></div>
                            <ul>
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
            <section className="telaBranca p-10 w-80">
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