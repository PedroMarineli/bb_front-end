import { useState } from "react";
import Botao from "../../components/Botao";
import { useDesk } from "../../hooks/useDesk";
import { IMesa } from "../../interface/IMesa";
import { useDeskMutate } from "../../hooks/useDeskMutate";

const ReservaDeMesas = () => {
    const { data } = useDesk();

    const [ativado, setAtivado] = useState(false)
    const ativar = () => {
        setAtivado(!ativado)
    }

    const [deskNumber, setDeskNumber] = useState(0)
    const [mesasAtualizadas, setMesasAtualizadas] = useState(0)
    const { mutate, isSuccess } = useDeskMutate(); 
    const atualizaMesas = () => {
        const deskData: IMesa = {
            deskNumber
        }

        mutate(deskData)
    }

    /*function atualizaMesas() {
        setMesasAtualizadas(qtdMesas)
        setAtivado(!ativado)
    }*/

    return(
        <section className="telaBranca">
            <ul className="grid grid-cols-2 pb-10 gap-x-10 gap-y-3">
                {data?.map(desk => 
                    <li key={desk.id} className="flex justify-between">
                        <p>Mesa {desk.id + 1}</p>
                        <div className="h-7 w-7 bg-green rounded-full"></div>
                    </li>
                )}
            </ul>
            <div className="flex justify-around">
            <div onClick={ativar} className={`${ativado ? 'opacity-55 pointer-events-none' : 'opacity-100'}`}><Botao children="Alterar Mesas"/></div>
                <form className={`flex gap-4 items-center justify-between ${ativado ? 'opacity-100' : 'opacity-55 pointer-events-none'}`}>
                    <p>Quantidade de mesas:</p>
                    <input className="input" type="number" value={deskNumber} onChange={e => setDeskNumber(Number(e.target.value))}/>
                    <button onClick={atualizaMesas}><Botao children="Atualizar"/></button>
                </form>
            </div>
        </section>
    )
}
export default ReservaDeMesas;