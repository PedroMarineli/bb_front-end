import { useState } from "react";
import Botao from "../../components/Botao";
import { useDesk } from "../../hooks/useDesk";
import { useDeskMutate } from "../../hooks/useDeskMutate";
import { IDeskId, IDeskNumber } from "../../interface/IDesk";

const ReservaDeMesas = () => {
    const [deskNumber, setDeskNumber] = useState(0)
    const [ativado, setAtivado] = useState(false)
    const { mesas, isLoading, refetch } = useDesk()
    const { postMutate, putMutate } = useDeskMutate()

    const mesasOrdenadas = mesas?.content.sort((a, b) => {
        if (a.id === null && b.id === null) return 0 
        else if (a.id === null) return 1
        else if (b.id === null) return -1
        else {
            if (a.id < b.id) return -1
            if (a.id > b.id) return 1
            else return 0
        }
    })
    
    const ativar = () => {
        setAtivado(!ativado)
    }
    
    const atualizaMesas = () => {
        const deskData: IDeskNumber = {
            deskNumber
        }
        postMutate.mutate(deskData)
        setAtivado(!ativado)
        refetch()
    }

    const statusMesa = (id: any) => {
        const deskData: IDeskId = {
            id
        }
        putMutate.mutate(deskData, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    return(
        <section className="telaBranca">
            <ul className="grid grid-cols-2 pb-10 gap-x-10 gap-y-3">
                {isLoading ? <p>Carregando...</p> : <>
                    {mesasOrdenadas?.map((item) => 
                        <li key={item.id} className="flex justify-between">
                            <p>Mesa {item.id}</p>
                            <div onClick={() => statusMesa(item.id)} className={`h-7 w-7 rounded-full ${item.filled ? 'bg-red-700' : 'bg-green-800'}`}></div>
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