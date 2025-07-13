import { useState } from "react";
<<<<<<< HEAD
import { ICreateUser } from "../../interface/IUsers";
import Botao from "../Botao";
import Janela from "../../components/Janela";
import { useUserMutate } from "../../hooks/useUserMutate";
import { useUsers } from "../../hooks/useUser";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";

const CadastraUsuario = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<"ADMIN" | "USER">("USER")
    const { refetch } = useUsers()
    const { postMutate } = useUserMutate()
    const aberto = useSetRecoilState(menuState)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const users: ICreateUser = {
            username,
            password,
            role
        }
        postMutate.mutate(users, {
            onSuccess: () => {
                refetch()
                aberto(false)
            }
        })        
=======
import { IUsuario } from "../../types/IUsuario";
import Botao from "../Botao";
import Janela from "../Janela";

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
>>>>>>> origin/main
    }

    return(
        <Janela titulo="Cadastrar" conteudo={
<<<<<<< HEAD
            <form className="grid justify-items-center" onSubmit={submit}>
                <div className="grid gap-8 my-12">
                    <input required type="text" placeholder="Nome de Usuário" className="input" id="id" onChange={(e) => setUsername(e.target.value)}/>
                    <input required type="text" placeholder="Senha" className="input" id="senha" onChange={(e) => setPassword(e.target.value)}/>
                    <select className="input" onChange={(e) => setRole(e.target.value  as "USER" | "ADMIN")}>
                        <option value="USER">Funcionário</option>
                        <option value="ADMIN">Administrador</option>
=======
            <form className="grid justify-items-center" onSubmit={adicionarUsuario}>
                <div className="grid gap-8 my-12">
                    <input required type="text" placeholder="Id" className="input" id="id" onChange={(e) => setId(e.target.value)}/>
                    <input required type="text" placeholder="Senha" className="input" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                    <select className="input" onChange={(e) => setHierarquia(e.target.value)}>
                        <option value=""></option>
                        <option value="Funcionário">Funcionário</option>
                        <option value="Administrador">Administrador</option>
>>>>>>> origin/main
                    </select>
                </div>
                <button type="submit">
                    <Botao children="Cadastrar"/>
                </button>
            </form>
        }/>
    )
}

<<<<<<< HEAD
export default CadastraUsuario
=======
export default CadastraUsuario;
>>>>>>> origin/main
