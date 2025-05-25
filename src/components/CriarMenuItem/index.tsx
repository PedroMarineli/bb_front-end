import { useEffect, useState } from "react";
import { useMenuItemMutate } from "../../hooks/UseMenuItemMutate";
import { IPostMenuItem } from "../../interface/IMenu";
import Botao from "../Botao";

interface Props {
    closeModal(): void
}

const CriarMenuItem = ({closeModal}: Props) => {
    const [id, setId] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [available, setAvailable] = useState(true)
    const [preco, setPreco] = useState("")
    const price = parseFloat(preco)
    const { postMutate } = useMenuItemMutate()

    const submit = () => {
        const menuItem: IPostMenuItem = {
            price: price,
            category: category,
            description: description,
            name: name,
            available: available,
            menu: { id: id }
        }
        postMutate.mutate(menuItem)
    }

    useEffect(() => {
        if(postMutate.isSuccess) {
            closeModal()
        }
    }, [postMutate.isSuccess])

    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela w-max">
                <div className="flex justify-between items-center">
                    <div></div>
                    <h3 className="tituloJanela text-center">Novo Item</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={closeModal}/>
                </div>
                <form className="grid gap-10 justify-items-center" onSubmit={submit}>
                    <h2>Cadastre um novo item no cardápio:</h2>
                    <div className="grid gap-5">
                        <div className="flex gap-10">
                            <div className="form"><span>Nome:</span><input className="input" type="text" value={name} onChange={e => setName(e.target.value)}/></div>
                            <div className="form"><span>Categoria:</span><input className="input" type="text" value={category} onChange={e => setCategory(e.target.value)}/></div>
                        </div>
                        <div className="form"><span>Descrição:</span><input className="input w-full" type="text" value={description} onChange={e => setDescription(e.target.value)}/></div>
                        <div className="flex items-center justify-between">
                            <div className="form"><span>Preço:</span><input className="input w-40" type="text" value={preco} onChange={e => setPreco(e.target.value)}/></div>
                            <div className="flex gap-5">
                                <label><input type="radio" name="assinatura" onChange={() => setAvailable(true)}/>Disponível</label>
                                <label><input type="radio" name="assinatura" onChange={() => setAvailable(false)}/>Indisponível</label>
                            </div>
                            <input className="input w-28" type="number" value={id} onChange={e => setId(Number(e.target.value))}/>
                        </div>
                    </div>
                    <button className="btn-secondary"><Botao> Submeter </Botao></button>
                </form>
            </div>
        </div>
    )
}

export default CriarMenuItem;