import { useState } from "react";
import Botao from "../../components/Botao";

const ReservaDeMesas = () => {
    const [ativado, setAtivado] = useState(false)
    const ativar = () => {
        setAtivado(!ativado)
    }

    const [qtdMesas, setQtdMesas] = useState(0)
    const [mesasAtualizadas, setMesasAtualizadas] = useState(0)
    function atualizaMesas() {
        setMesasAtualizadas(qtdMesas)
        setAtivado(!ativado)
    }

    return(
        <section className="telaBranca">
            <ul className="grid grid-cols-2 pb-10 gap-x-10 gap-y-3">
                {Array.from({ length: mesasAtualizadas }).map((_, index) => (
                <li key={index} className="flex justify-between">
                    <p>Mesa {index + 1}</p>
                    <div className="h-7 w-7 bg-green rounded-full"></div>
                </li>
                ))}
            </ul>
            <div className="flex justify-around">
            <div onClick={ativar} className={`${ativado ? 'opacity-55 pointer-events-none' : 'opacity-100'}`}><Botao children="Alterar Mesas"/></div>
                <div className={`flex gap-4 items-center justify-between ${ativado ? 'opacity-100' : 'opacity-55 pointer-events-none'}`}>
                    <p>Quantidade de mesas:</p>
                    <input className="input" type="number" value={qtdMesas} onChange={e => setQtdMesas(Number(e.target.value))}/>
                    <button onClick={atualizaMesas}><Botao children="Atualizar"/></button>
                </div>
            </div>
        </section>
    )
}
export default ReservaDeMesas;