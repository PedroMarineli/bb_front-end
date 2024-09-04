import Botao from "../Botao";

const LoginSistema = () => {
    return(
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center">
                    <div></div>
                    <h3 className="tituloJanela text-center">Login</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6"/>
                </div>
                <div className="grid justify-items-center">
                    <div className="grid gap-8 my-12">
                        <input type="text" placeholder="Id" className="input"/>
                        <input type="password" placeholder="Senha" className="input"/>
                    </div>
                    <Botao children="Entrar"/>
                </div>
            </div>
        </div>
    )
}

export default LoginSistema;