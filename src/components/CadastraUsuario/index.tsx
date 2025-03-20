import { useState } from "react";
import { IUsuario } from "../../types/IUsuario";
import Botao from "../Botao";
import Janela from "../../components/Janela";

interface Props {
    setUsuarios: React.Dispatch<React.SetStateAction<IUsuario[]>>
}

const CadastraUsuario = ({setUsuarios}: Props) => {
    const [id, setId] = useState("")
    const [senha, setSenha] = useState("")
    const [hierarquia, setHierarquia] = useState("")
    function adicionarUsuario(evento: React.FormEvent) {
        evento.preventDefault()
        setUsuarios(usuariosAntigos => [
            ...usuariosAntigos,
            {
                id,
                senha,
                hierarquia
            }
        ])
    }

    return(
        <Janela titulo="Cadastrar" conteudo={
            <form className="grid justify-items-center" onSubmit={adicionarUsuario}>
                <div className="grid gap-8 my-12">
                    <input required type="text" placeholder="Id" className="input" id="id" onChange={(e) => setId(e.target.value)}/>
                    <input required type="text" placeholder="Senha" className="input" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                    <select className="input" onChange={(e) => setHierarquia(e.target.value)}>
                        <option value=""></option>
                        <option value="Funcionário">Funcionário</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <button type="submit">
                    <Botao children="Cadastrar"/>
                </button>
            </form>
        }/>
    )
}

export default CadastraUsuario;