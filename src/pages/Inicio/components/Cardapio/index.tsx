import { useState } from 'react';
import cardapio from '../../../../mocks/cardapio.json';

const Cardapio = () => {
    const [lista, setLista] = useState(cardapio);

    return (
        <section className="telaBranca text-center grid gap-14" id='cardapio'>
            <h2 className="titulosMain">Cardápio</h2>
            <div>
                <p className="text-2xl mb-14">Descubra nossos pratos clássicos, preparados com carinho e ingredientes frescos. Deixe-se surpreender pela simplicidade e sabor que só a cozinha tradicional pode oferecer.</p>
                <div className="grid sm: xl:grid-cols-2 gap-14">
                    {lista.map(categoria => (
                        <div className='grid gap-7 break-before'>
                            <h2 className='text-2xl'>{categoria.nome}:</h2>
                            <ul className='grid gap-7'>
                            {categoria.itens.map((item) => (
                                <li key={item.nome}>
                                    <div className='flex'>
                                        <p>{item.nome}: {item.descricao} - R${item.preco.toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-3 justify-center mt-14'>
                    <p>Aproveite!</p>
                    <img src="./public/icons/lanche.png" alt="Lanche" />
                </div>
            </div>
        </section>
    )
}

export default Cardapio;