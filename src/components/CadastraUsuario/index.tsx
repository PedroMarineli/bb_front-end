import { useState } from "react";
import { ICreateUser } from "../../interface/IUsers";
import Botao from "../Botao";
import Janela from "../../components/Janela";
import { useUserMutate } from "../../hooks/useUserMutate";
import { useUsers } from "../../hooks/useUser";

const CadastraUsuario = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //const [hierarquia, setHierarquia] = useState("")
    const { refetch } = useUsers()
    const { postMutate } = useUserMutate()
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const users: ICreateUser = {
            username,
            password
        }
        postMutate.mutate(users)
        refetch()
    }

    return(
        <Janela titulo="Cadastrar" conteudo={
            <form className="grid justify-items-center" onSubmit={submit}>
                <div className="grid gap-8 my-12">
                    <input required type="text" placeholder="Nome de Usuário" className="input" id="id" onChange={(e) => setUsername(e.target.value)}/>
                    <input required type="text" placeholder="Senha" className="input" id="senha" onChange={(e) => setPassword(e.target.value)}/>
                    {/* <select className="input" onChange={(e) => setHierarquia(e.target.value)}>
                        <option value=""></option>
                        <option value="Funcionário">Funcionário</option>
                        <option value="Administrador">Administrador</option>
                    </select> */}
                </div>
                <button type="submit">
                    <Botao children="Cadastrar"/>
                </button>
            </form>
        }/>
    )
}

export default CadastraUsuario;