import { useState } from "react";
//import lataLixo from "/icons/lata-de-lixo.png";
import Botao from "../Botao";
import { IUpdateUser } from "../../interface/IUsers";

type Props = IUpdateUser & { onClose(): void, onSubmit(body: IUpdateUser): void }

const AlterarUsuario = ({ onClose, onSubmit, ...user }: Props) => {
    const [state, setState] = useState<IUpdateUser>(user)

    const submeterAlteracao = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(state)
    }

    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <h3 className="tituloJanela text-center">Alterar</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={onClose}/>
                </div>
                <form onSubmit={submeterAlteracao} className="grid justify-items-center">
                    <div className="grid gap-8 my-12">
                        <input type="text" name="username" value={state.username} onChange={(e) => setState({ ...state, username: e.target.value})} className='input'></input>
                        <input type="text" name="password" value={state.password} onChange={(e) => setState({ ...state, password: e.target.value})} className='input'></input>
                        <input required type="text" placeholder="Id" className="input" id="id"/>
                        {/* <input required type="text" placeholder="Senha" className="input" id="senha"/>
                        <select className="input">
                            <option value=""></option>
                            <option value="Funcionário">Funcionário</option>
                            <option value="Administrador">Administrador</option>
                        </select> */}
                    </div>
                    <button type="submit">
                        <Botao children="Alterar"/>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AlterarUsuario;

/*
<select className="input" onChange={(e) => setHierarquia(e.target.value)}>
    <option value=""></option>
    <option value="Funcionário">Funcionário</option>
    <option value="Administrador">Administrador</option>
</select>
*/