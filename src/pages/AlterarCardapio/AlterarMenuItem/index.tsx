import { IMenuItem } from "../../../interface/IMenu";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import alterar from "../../../../public/icons/alterar.png";
import { useMenuItemMutate } from "../../../hooks/UseMenuItemMutate";
import Exclusao from "../../../components/Exclusao";
import { useState } from "react";
import FormAlterarItemMenu from "./FormAlterarMenuItem";
import { deleteState, itemToDeleteState } from "../../../state/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Avisos from "../../../components/Avisos";

const AlterarMenuItem = (item: IMenuItem) => {
    const deleteFechado = useRecoilValue(deleteState)
    const deleteAberto = useSetRecoilState(deleteState)
    const { putMutate, deleteMutate } = useMenuItemMutate()
    const [itemToDeleteId, setItemToDeleteId] = useRecoilState(itemToDeleteState)
    const [formVisivel, setFormVisivel] = useState(false)
    const [error, setError] = useState<boolean>(false)
    
    const alterarItemMenu = () => {
        setFormVisivel(true)
    }

    const corfirmaExcluir = (id: any) => {
        deleteAberto(true)
        setItemToDeleteId(id)
    }

    const excluirMenuItem = (id: any) => {
        deleteMutate.mutate(id, {
            onSuccess: () => {
                setItemToDeleteId(null)
                setError(false)
            },
            onError: () => {
                setError(true)
                setTimeout(() => setError(false), 3000)
            }
        })
        deleteAberto(false)
    }

    const alterarMenuItem = (data: IMenuItem) => {
        putMutate.mutate(data, {
            onSuccess: () => {
                setFormVisivel(false)
            }
        })
    }

    if (deleteMutate?.isSuccess) {
        return <Exclusao/>
    }

    if (error) {
        return (
            <div className="fixed top-0 left-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4 z-50">
                <span className="block sm:inline">Ops! Houve algum erro! Provavelmente o item que você gostaria de excluir está sendo processado.</span>
            </div>
        )
    }
    
    if(formVisivel) {
        return <FormAlterarItemMenu onClose={() => setFormVisivel(false)} onSubmit={alterarMenuItem} { ...item } />
    }
    
    return (
        <div>
            <li key={item.id} className='list-none'>
                <div className={`grid grid-cols-12 gap-4 items-center ${item.available ? 'opacity-100' : 'opacity-40'}`}>
                    <p className="col-span-3">{item.name}</p>
                    <p className="col-span-6">{item.description}</p>
                    <div className="col-span-3 flex items-center justify-end gap-4">
                        <p>R$ {item.price?.toFixed(2)}</p>
                        <div onClick={() => corfirmaExcluir(item.id!)} className="cursor-pointer">
                            <img src={lataLixo} alt="Lata de lixo" className='h-6 w-6'/>
                        </div>
                        <div onClick={alterarItemMenu} className="cursor-pointer">
                            <img src={alterar} alt="Alterar" className='h-6 w-6'/>
                        </div>
                    </div>
                </div>
            </li>
            { deleteFechado && <Avisos title="Excluir Item" text={(
                <div className='grid gap-8 justify-center'>
                    <p>Tem certeza que quer excluir?! Essa ação não terá mais volta.</p>
                    <button onClick={() => itemToDeleteId !== null && excluirMenuItem(itemToDeleteId)}>Excluir</button>
                </div>
            )}/> }
        </div>
    )
}

export default AlterarMenuItem
