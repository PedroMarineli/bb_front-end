import { useState } from "react";
import Botao from "../../components/Botao";
import { useDesk } from "../../hooks/useDesk";
import { IMesa } from "../../interface/IMesa";
import { useDeskMutate } from "../../hooks/useDeskMutate";

const ReservaDeMesas = () => {
    const [deskNumber, setDeskNumber] = useState(0)
    const { mutate } = useDeskMutate(); 
    const { data } = useDesk();
    console.log("Data.content:", data);
    
    const [ativado, setAtivado] = useState(false)
    const ativar = () => {
        setAtivado(!ativado)
    }
    
    const atualizaMesas = () => {
        const deskData: IMesa = {
            deskNumber
        }
        mutate(deskData)
        setAtivado(!ativado)
    }


    return(
        <section className="telaBranca">
            <ul className="grid grid-cols-2 pb-10 gap-x-10 gap-y-3">
                {Array.isArray(data) && data?.map((desk) => (
                    <div>
                        {desk.content.map((item) => 
                            <li key={item.id} className="flex justify-between">
                                <p>Mesa {item.id}</p>
                                <div className="h-7 w-7 bg-green rounded-full"></div>
                            </li>
                        )}
                    </div>
                    )
                )}
            </ul>
            <div className="flex justify-around">
            <div onClick={ativar} className={`${ativado ? 'opacity-55 pointer-events-none' : 'opacity-100'}`}><Botao children="Alterar Mesas"/></div>
                <div className={`flex gap-4 items-center justify-between ${ativado ? 'opacity-100' : 'opacity-55 pointer-events-none'}`}>
                    <p>Quantidade de mesas:</p>
                    <input className="input" type="number" value={deskNumber} onChange={e => setDeskNumber(Number(e.target.value))}/>
                    <button onClick={atualizaMesas}><Botao children="Atualizar"/></button>
                </div>
            </div>
        </section>
    )
}

export default ReservaDeMesas;