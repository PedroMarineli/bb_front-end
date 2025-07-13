import Botao from "../Botao";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDoLogin } from "../../interface/ILogin";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { useUsers } from "../../hooks/useUser";
import { useUsuarioLogado } from "../../context/UserLogadoContext";
import Janela from "../Janela";

interface Props {
    chamarFale: React.MouseEventHandler<HTMLDivElement>
}

const LoginSistema = ({chamarFale}: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { users } = useUsers()
    const { mutate } = useLoginMutate()
    const { setUsuarioLogado } = useUsuarioLogado()
    const navigate = useNavigate()
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(false)
    }

    const validarLogin = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const loginData: IDoLogin = {
            username,
            password,
        }

        mutate(loginData, {
            onSuccess: (data) => {
                if (data?.data?.tokenJWT) {
                    localStorage.setItem('token', data.data.tokenJWT)

                    const usuarioEncontrado = users?.content.find((user) => user.username === username)
                    if (usuarioEncontrado) {
                        navigate('/bb')
                        setUsuarioLogado(usuarioEncontrado)
                        alterarStatus()
                    } else {
                        localStorage.removeItem('token')
                    }
                } else {
                    console.error('Erro: Token JWT não recebido do servidor.')
                }
            },
            onError: (err: any) => {
                setErrorMessage('Usuário ou senha incorretos!')
                console.error('Erro ao fazer login:', err)
                console.error(err?.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.')
            }
        })
    }

    return(
        <Janela titulo="Login" conteudo={
            <form className="grid justify-items-center gap-8" onSubmit={validarLogin}>
                <div className="grid gap-8">
                    <input required type="text" placeholder="Username" className="input" id="username" onChange={(e) => setUsername(e.target.value)}/>
                    <input required type="password" placeholder="Senha" className="input" id="senha" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errorMessage && (
                    <span className="text-red-700 block sm:inline">{errorMessage}</span>
                )}
                <div className="grid justify-items-center">
                    <div className="cursor-pointer" onClick={chamarFale}>Esqueceu a senha?</div>
                    <p>Entre em contato com um administrador para efetuar a troca da senha.</p>
                </div>
                <button type="submit">
                    <Botao children="Entrar"/>
                </button>
            </form>
        }/>
    )
}

export default LoginSistema
