import { useState } from "react"
import { IMenuItem } from "../../../../interface/IMenu"
import { useMutation } from "@tanstack/react-query"

type Props = IMenuItem & { onClose(): void, onSubmit(body: IMenuItem): void }

const FormAlterarItemMenu = ({ onClose, onSubmit, ...item }: Props) => {
    const [state, setState] = useState<IMenuItem>(item)

    const submeterAlteracao = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(state)
    }

    return (
        <form onSubmit={submeterAlteracao}>
            <div className='flex justify-between gap-5 items-center'>
                <input type="text" name="name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value})} className='inputAlterar w-52'></input>
                {/* <input type="text" name="descricao" value={item.description} onChange={(e) => setState({ ...state, description: e.target.value})} className='inputAlterar w-full'></input> */}
                <input type="text" name="category" value={state.category} onChange={(e) => setState({ ...state, category: e.target.value})} className='inputAlterar w-full'></input>
                <input type="text" value={state.price.toString()} onChange={(e) => setState({ ...state, price: Number(e.target.value)})} className='inputAlterar w-20'></input>
                {/* <div value={item.available} onClick={(e) => handleInputChange(item.id, 'available', e.target.value)} className={`h-7 w-7 rounded-full ${item.available ? 'bg-green-800' : 'bg-red-700'}`}></div> */}
                <input type="number" value={state.menu?.id} onChange={(e) => {setState(prevState => ({...prevState,menu: {...prevState.menu,id: Number(e.target.value)}}))}}className="inputAlterar w-20"/>
                <div>
                    <button>Salvar</button>
                </div>
                <div onClick={onClose} className="flex justify-center">
                    <button>Cancelar</button>
                </div>
            </div>
        </form>
    )
}

export default FormAlterarItemMenu;