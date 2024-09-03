import Botao from "../Botao";

const Login = () => {
    return(
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela items-center">
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <h3 className="tituloJanela text-center">Login</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6"/>
                </div>
                <input type="text" placeholder="Id" className="w-3/4"/>
                <input type="password" placeholder="Senha" className="w-3/4"/>
                <Botao children="Entrar"/>
            </div>
        </div>
    )
}

export default Login;