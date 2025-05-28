import Botao from "../Botao";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDoLogin } from "../../interface/ILogin";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { useUsers } from "../../hooks/useUser";
import { useUsuarioLogado } from "../../context/UserLogadoContext";

interface Props {
    chamarFale: React.MouseEventHandler<HTMLDivElement>
}

const LoginSistema = ({chamarFale}: Props) => {
    const { mutate } = useLoginMutate();
    const { users } = useUsers()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
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
                    console.log("Token recebido e armazenado:", data.data.tokenJWT)

                    const usuarioEncontrado = users?.content.find((user) => user.username === username)
                    if (usuarioEncontrado) {
                        setUsuarioLogado(usuarioEncontrado)
                        navigate('/bb')
                        alterarStatus()
                    } else {
                        setLoginError('Usuário não encontrado após o login.')
                    }
                } else {
                    setLoginError('Erro: Token JWT não recebido do servidor.')
                }
            },
            onError: (err: any) => {
                console.error('Erro ao fazer login:', err)
                setLoginError(err?.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.')
            }
        })
    }

    return(
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center">
                    <div></div>
                    <h3 className="tituloJanela text-center">Login</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={alterarStatus}/>
                </div>
                <form className="grid justify-items-center gap-8" onSubmit={validarLogin}>
                    <div className="grid gap-8">
                        <input required type="text" placeholder="Username" className="input" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <input required type="password" placeholder="Senha" className="input" id="senha" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="grid justify-items-center">
                        <div className="cursor-pointer" onClick={chamarFale}>Esqueceu a senha?</div>
                        <p>Entre em contato com um administrador para efetuar a troca da senha.</p>
                    </div>
                    <button type="submit">
                        <Botao children="Entrar"/>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginSistema;