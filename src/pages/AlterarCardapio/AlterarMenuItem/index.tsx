import { IMenuItem } from "../../../interface/IMenu";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import { useMenuItemMutate } from "../../../hooks/UseMenuItemMutate";
import Exclusao from "../../../components/Exclusao";
import { useState } from "react";
import FormAlterarItemMenu from "./FormAlterarMenuItem";
import { deleteState } from "../../../state/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Avisos from "../../../components/Avisos";

const AlterarMenuItem = (item: IMenuItem) => {
    const { putMutate, deleteMutate } = useMenuItemMutate()
    const [formVisivel, setFormVisivel] = useState(false)
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
    const deleteFechado = useRecoilValue(deleteState)
    const deleteAberto = useSetRecoilState(deleteState)
    
    const corfirmaExcluir = (id: any) => {
        deleteAberto(true)
        setItemToDeleteId(id)
    }

    const excluirMenuItem = (id: any) => {
        deleteMutate.mutate(id)
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
                    <p>{item.category}</p>
                    <p>{item.price}</p>             
                    <div onClick={() => corfirmaExcluir(item.id)}>
                        <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
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

export default AlterarMenuItem;