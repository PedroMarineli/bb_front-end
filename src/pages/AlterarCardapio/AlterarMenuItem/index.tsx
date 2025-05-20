import { IMenuItem } from "../../../interface/IMenu";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
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
    const [formVisivel, setFormVisivel] = useState(false)  
    const [itemToDeleteId, setItemToDeleteId] = useRecoilState(itemToDeleteState)
    
    const corfirmaExcluir = (id: any) => {
        deleteAberto(true)
        setItemToDeleteId(id)
    }

    const excluirMenuItem = (id: any) => {
        console.log("ID garantido:", id)
        deleteMutate.mutate(id, {
            onSuccess: () => {
                setItemToDeleteId(null)
            },
            onError: (error) => {
                console.error("Falha durante a mutação:", error)
            }
        })
    }

    const alterarMenuItem = (data: IMenuItem) => {
        putMutate.mutate(data)
    }

    if (deleteMutate?.isSuccess) {
        return <Exclusao/>
    }
    
    const alterarItemMenu = () => {
        setFormVisivel(true)
    }
    
    if(formVisivel) {
        return <FormAlterarItemMenu onClose={() => setFormVisivel(false)} onSubmit={alterarMenuItem} { ...item } />
    }
    
    return (
        <div>
            <li key={item.id} className='list-none'>
                <div className='flex justify-between gap-5 items-center'>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>{item.price}</p>             
                    <div onClick={() => corfirmaExcluir(item.id!)}>
                        <img src={lataLixo} alt="Lata de lixo" className='w-8 cursor-pointer'/>
                    </div>
                    <div onClick={() => alterarItemMenu()} className="flex justify-center">
                        <button>Alterar</button>
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
