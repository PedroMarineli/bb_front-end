import { useSetRecoilState } from "recoil";
import Botao from "../Botao";
import { menuState } from "../../state/atom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDoLogin } from "../../interface/ILogin";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { useUsers } from "../../hooks/useUser";

const LoginSistema = () => {
    //const { mutate, isSuccess, data: loginData, error } = useLoginMutate();
    //const { isLoading: isUsersLoading, error: usersError } = useUsers();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(false)
    }

    // const validarLogin = () => {
    //     const loginData: IDoLogin = {
    //         username,
    //         password
    //     }
    //     mutate(loginData)
    //     navigate('/bb-reservas');
    // };

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     if (storedToken !== null) {
    //         navigate('/bb');
    //         alterarStatus();
    //     }
    // }, [validarLogin]);

    const validarLogin = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        setIsLoading(true)
        setLoginError('')

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.tokenJWT)
                console.log("Token recebido e armazenado:", data.tokenJWT)
                navigate('/bb-reservas')
                alterarStatus()
            } else {
                setLoginError(data.error || 'Erro ao fazer login. Verifique suas credenciais.')
            }
        } catch (error) {
            console.error('Erro na comunicação com o servidor:', error)
            setLoginError('Erro ao conectar com o servidor.')
        } finally {
            setIsLoading(false)
        }
    };

    // useEffect para verificar o token ao montar o componente (opcional, dependendo do fluxo)
    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     if (storedToken !== null) {
    //         setToken(storedToken);
    //         navigate('/bb');
    //         alterarStatus();
    //     }
    // }, [navigate, alterarStatus]);

    // useEffect(() => {
    //     if (isSuccess && loginData?.data?.token) {
    //         console.log("Sucesso");
    //         console.log(loginData.data.token);
    //         localStorage.setItem('TOKEN_APLICACAO_FRONTEND', loginData.data.token);
    //         navigate('/bb');
    //         window.location.reload(); // Recarregar após a navegação pode não ser o ideal, considere outras formas de atualizar o estado se necessário
    //         alterarStatus();
    //     } else if (isSuccess && !loginData?.data?.token) {
    //         console.log("Login bem-sucedido, mas token não encontrado na resposta.");
    //         // Lógica para lidar com a ausência do token
    //     } else if (error) {
    //         console.log("Erro no login:", error);
    //         // Lógica para lidar com o erro de login
    //     }
    // }, [isSuccess, loginData, navigate, alterarStatus, error]);

    // useEffect(() => {
    //     if (isLoginSuccess && loginData?.data?.token) {
    //         localStorage.setItem('tokenJWT', loginData.data.token);
    //         console.log("Login bem-sucedido, token armazenado e navegando.");
    //         navigate('/bb');
    //         alterarStatus();
    //     } else if (isLoginSuccess && !loginData?.data?.token) {
    //         console.log("Login bem-sucedido, mas token não encontrado na resposta.");
    //         // Lógica para lidar com a ausência do token
    //     }
    // }, [isLoginSuccess, loginData, navigate, alterarStatus]);

    return(
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center">
                    <div></div>
                    <h3 className="tituloJanela text-center">Login</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={alterarStatus}/>
                </div>
                <form className="grid justify-items-center" onSubmit={validarLogin}>
                    <div className="grid gap-8 my-12">
                        <input required type="text" placeholder="Username" className="input" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <input required type="password" placeholder="Senha" className="input" id="senha" onChange={(e) => setPassword(e.target.value)}/>
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