import { useState } from "react";
import Botao from "../../components/Botao";
import { useDesk } from "../../hooks/useDesk";
import { useDeskMutate } from "../../hooks/useDeskMutate";
import { IDeskNumber } from "../../interface/IDeskNumber";

const ReservaDeMesas = () => {
    const [deskNumber, setDeskNumber] = useState(0)
    const [ativado, setAtivado] = useState(false)
    const [ocupada, setOcupada] = useState(false)
    const { data, isLoading } = useDesk();
    const { mutate } = useDeskMutate(); 
    console.log("Data:", data);
    
    const ativar = () => {
        setAtivado(!ativado)
    }
    
    const atualizaMesas = () => {
        const deskData: IDeskNumber = {
            deskNumber
        }
        mutate(deskData)
        setAtivado(!ativado)
    }

    const statusMesa = () => {
        setOcupada(!ocupada)
    }

    return(
        <section className="telaBranca">
            <ul className="grid grid-cols-2 pb-10 gap-x-10 gap-y-3">
                {isLoading ? <p>Carregando...</p> : <>
                    {data?.content.map((item) => 
                        <li key={item.id} className="flex justify-between">
                            <p>Mesa {item.id}</p>
                            <div onClick={statusMesa} className={`h-7 w-7 rounded-full ${ocupada ? 'bg-green-800' : 'bg-red-700'}`}></div>
                        </li>
                    )}
                </>}
            </ul>
            <div className="flex justify-around">
                <button onClick={ativar} className={`${ativado ? 'opacity-55 pointer-events-none' : 'opacity-100'}`}><Botao children="Alterar Mesas"/></button>
                <div className={`flex gap-4 items-center justify-around ${ativado ? 'opacity-100' : 'opacity-55 pointer-events-none'}`}>
                    <p>Quantidade de mesas:</p>
                    <input className="input w-52" type="number" value={deskNumber} onChange={e => setDeskNumber(Number(e.target.value))}/>
                    <button onClick={atualizaMesas}><Botao children="Atualizar"/></button>
                </div>
            </div>
        </section>
    )
}

export default ReservaDeMesas;