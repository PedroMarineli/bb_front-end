import { IMenuItem } from "../../../interface/IMenu";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import { useMenuItemMutate } from "../../../hooks/UseMenuItemMutate";
import Exclusao from "../../../components/Exclusao";
import { useState } from "react";
import FormAlterarItemMenu from "./FormAlterarMenuItem";

const AlterarMenuItem = (item: IMenuItem) => {
    const { putMutate, deleteMutate } = useMenuItemMutate()
    const [formVisivel, setFormVisivel] = useState(false)

    const alterarMenuItem = (data: IMenuItem) => {
        console.log({ data })

        putMutate.mutate(data)
    }

    const excluirMenuItem = (id: any) => {
        deleteMutate.mutate(id)
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
        <li key={item.id} className='list-none'>
            <div className='flex justify-between gap-5 items-center'>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>             
                <div onClick={() => excluirMenuItem(item.id)}>
                    <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                </div>
                <div onClick={() => alterarItemMenu()} className="flex justify-center">
                    <button>Alterar</button>
                </div>
            </div>
        </li>
    )
}

export default AlterarMenuItem;