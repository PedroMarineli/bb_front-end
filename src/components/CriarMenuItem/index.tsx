import Janela from "../../components/Janela";
import LogoBB from "../../../public/images/logoBB.png";
import { useEffect, useState } from "react";
import { IMenuItem } from "../../interface/IMenuItem";
import { useMenuItemMutate } from "../../hooks/UseMenuItemMutate";

interface ModalProps {
    closeModal(): void
}

const CriarMenuItem = ({ closeModal }: ModalProps) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const { mutate, isSuccess } = useMenuItemMutate()

    const submit = () => {
        const menuItem: IMenuItem = {
            name,
            price, 
            category
        }

        mutate(menuItem)
    }

    // useEffect(() => {
    //     if(isSuccess) {
    //         closeModal()
    //     }
    // }, [isSuccess])

    return (
        <Janela titulo="Adicionar Item" conteudo={
            <div className="grid justify-items-center gap-5">
                <div className="modal-body">
                    <h2>Cadastre um novo item no cardápio:</h2>
                    <form className="input-container" action="">
                        <input className="input" type="text" value={name} onChange={e => setName(e.target.value)}/>
                        <input className="input" type="text" value={price} onChange={e => setPrice(e.target.value)}/>
                        <input className="input" type="text" value={category} onChange={e => setCategory(e.target.value)}/>
                    </form>
                    <button onClick={submit} className="btn-secondary">Submeter</button>
                </div>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        }/>
    )
}

export default CriarMenuItem;