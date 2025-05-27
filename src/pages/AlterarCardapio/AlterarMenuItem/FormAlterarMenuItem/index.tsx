import { useState } from "react";
import { IMenuItem } from "../../../../interface/IMenu";

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
                <input type="text" name="name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value})} className='inputAlterar w-36'></input>
                <input type="text" name="description" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value})} className='inputAlterar w-full'></input>
                <input type="text" value={state.price?.toString()} onChange={(e) => setState({ ...state, price: Number(e.target.value)})} className='inputAlterar w-20'></input>
                <div className="flex gap-5">
                    <div className="flex gap-1"><input type="radio" name="available" value="true" checked={state.available === true} onChange={() => setState({ ...state, available: true })}/><label>Disponível</label></div>
                    <div className="flex gap-1"><input type="radio" name="available" value="false" checked={state.available === false} onChange={() => setState({ ...state, available: false })}/><label>Indisponível</label></div>        
                </div>
                <div> <button>Salvar</button> </div>
                <div onClick={onClose} className="flex justify-center">
                    <button>Cancelar</button>
                </div>
            </div>
        </form>
    )
}

export default FormAlterarItemMenu;