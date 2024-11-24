import { useState } from "react";
import { Link } from "react-router-dom";
import cardapio from '../../mocks/cardapio.json';
import Botao from "../../components/Botao";
import PedidoEnviado from "../../components/PedidoEnviado";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";

const CadastroDePedidos = () => {
    const [lista, setLista] = useState(cardapio);
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

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
                <div className='grid gap-7'>
                    <h2 className='text-2xl text-center pt-7'>Observações:</h2>
                    <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"/>
                    <div className="flex justify-center" onClick={alterarStatus}>
                        <Botao>Enviar para a cozinha</Botao>
                    </div>
                </div>
            </section>
            <button className="pt-5">
                <Link to='/bb-alterar-cardapio'>Alterar Cardápio</Link>
            </button>
            { fechado && <PedidoEnviado/>}
        </div>
    )
}
export default CadastroDePedidos;