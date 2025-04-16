import { useSetRecoilState } from "recoil";
import Botao from "../Botao";
import { menuState } from "../../state/atom";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDoLogin } from "../../interface/ILogin";
import { useLoginMutate } from "../../hooks/useLoginMutate";
import { useUsers } from "../../hooks/useUser";
import { LoginService } from "../../hooks/LoginService";

const LoginSistema = () => {
    const { mutate, isSuccess, data: loginData, error } = useLoginMutate();
    //const { isLoading: isUsersLoading, error: usersError } = useUsers();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(false)
    }

    //if(isUsersLoading) console.log("Loading Users...")
    //if(usersError) console.log("Something went wrong fetching users")
    //if(isLoginLoading) console.log("Logging in...")
    //if(loginError) console.log("Login failed")

    const loginService = useMemo(() => new LoginService(), []);

    // const [id, setId] = useState('')
    // const [senha, setSenha] = useState('')
    // var idBB = "burguerboss"
    // var senhaBB = "123"

    // const validarLogin = (evento: React.FormEvent<HTMLFormElement>) => {
    //         evento.preventDefault()

    //         if(id === idBB && senha === senhaBB) {
    //             navigate('/bb')
    //             alterarStatus()
    //         }
    //         else if(id === idBB || senha === senhaBB) {
    //             alert("Id ou senha incorretos!")
    //         }
    //         else {
    //             alert("Erro ao logar. Tente novamente!")
    //         }
    // }

    const validarLogin = () => {
        const validateLogin: IDoLogin = {
            username,
            password
        }
        mutate(validateLogin)
        // loginService.login(username, password).then((response) => {            
        //     console.log("Sucesso");
        //     console.log(response.data.token);

        //     localStorage.setItem('TOKEN_APLICACAO_FRONTEND', response.data.token);

        //     navigate('/bb');
        //     window.location.reload();
        // })
    }

    useEffect(() => {
        if (isSuccess && loginData?.data?.token) {
            console.log("Sucesso");
            console.log(loginData.data.token);
            localStorage.setItem('TOKEN_APLICACAO_FRONTEND', loginData.data.token);
            navigate('/bb');
            window.location.reload(); // Recarregar após a navegação pode não ser o ideal, considere outras formas de atualizar o estado se necessário
            alterarStatus();
        } else if (isSuccess && !loginData?.data?.token) {
            console.log("Login bem-sucedido, mas token não encontrado na resposta.");
            // Lógica para lidar com a ausência do token
        } else if (error) {
            console.log("Erro no login:", error);
            // Lógica para lidar com o erro de login
        }
    }, [isSuccess, loginData, navigate, alterarStatus, error]);

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