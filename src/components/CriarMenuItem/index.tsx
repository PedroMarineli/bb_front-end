import LogoBB from "../../../public/images/logoBB.png";
import { useEffect, useState } from "react";
import { useMenuItemMutate } from "../../hooks/UseMenuItemMutate";
import { IMenuItem } from "../../interface/IMenu";

interface Props {
    closeModal(): void
}

const CriarMenuItem = ({closeModal}: Props) => {
    const [id, setId] = useState(4)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [available, setAvailable] = useState(true)
    const [preco, setPreco] = useState("")
    const price = parseFloat(preco)
    const { postMutate } = useMenuItemMutate()

    const submit = () => {
        const menuItem: IMenuItem = {
            name,
            price, 
            category,
            available,
            menu: { id: id }
        }
        postMutate.mutate(menuItem)
    }

    useEffect(() => {
        if(postMutate.isSuccess) {
            closeModal()
        }
    }, [postMutate.isSuccess])

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
                            <span>Preço:</span><input className="input" type="text" value={preco} onChange={e => setPreco(e.target.value)}/>
                        </div>
                        <span>Categoria:</span><input className="input" type="text" value={category} onChange={e => setCategory(e.target.value)}/>
                        {/* <select name="available" id="status" value={available.toString()} onChange={handleChange}>
                            <option value="true">Disponível</option>
                            <option value="false">Indisponível</option>
                        </select>
                        <input className="input" type="number" value={id} onChange={e => setId(Number(e.target.value))}/> */}
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