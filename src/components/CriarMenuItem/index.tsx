import Janela from "../../components/Janela";
import LogoBB from "../../../public/images/logoBB.png";
import { useEffect, useState } from "react";
import { IMenuItem } from "../../interface/IMenuItem";
import { useMenuItemMutate } from "../../hooks/UseMenuItemMutate";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";

interface Props {
    closeModal(): void
}

const CriarMenuItem = ({closeModal}: Props) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [available, setAvailable] = useState(true)
    const { mutate, isSuccess } = useMenuItemMutate()

    const submit = () => {
        const menuItem: IMenuItem = {
            name,
            price, 
            category,
            available
        }

        mutate(menuItem)
    }

    useEffect(() => {
        if(isSuccess) {
            closeModal()
        }
    }, [isSuccess])

    const handleChange = (event: any) => {
        setAvailable(event.target.value === 'true');
    };

    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center">
                    <div></div>
                    <h3 className="tituloJanela text-center">Novo Item</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={closeModal}/>
                </div>
                <div className="modal-body">
                    <h2>Cadastre um novo item no cardápio:</h2>
                    <form className="grid gap-5" action="">
                        <div>
                            <span>Nome:</span><input className="input" type="text" value={name} onChange={e => setName(e.target.value)}/>
                            <span>Preço:</span><input className="input" type="text" value={price} onChange={e => setPrice(e.target.value)}/>
                        </div>
                        <span>Categoria:</span><input className="input" type="text" value={category} onChange={e => setCategory(e.target.value)}/>
                        {/* <select name="available" id="status" value={available.toString()} onChange={handleChange}>
                            <option value="true">Disponível</option>
                            <option value="false">Indisponível</option>
                        </select> */}
                    </form>
                    <button onClick={submit} className="btn-secondary">Submeter</button>
                </div>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        </div>
    )
}

export default CriarMenuItem;