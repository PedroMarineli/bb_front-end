import { useState } from "react";
import { Link } from "react-router-dom";
import cardapio from '../../mocks/cardapio.json';
import Botao from "../../components/Botao";

const CadastroDePedidos = () => {
    const [lista, setLista] = useState(cardapio);

    return (
        <div>
            <section className="telaBranca">
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
                <div className="pt-8">
                    <Botao>Enviar para a cozinha</Botao>
                </div>
            </section>
            <button className="pt-5">
                <Link to='/bb-alterar-cardapio'>Alterar Cardápio</Link>
            </button>
        </div>
    )
}
export default CadastroDePedidos;