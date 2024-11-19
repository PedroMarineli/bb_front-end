import { useSetRecoilState } from "recoil";
import Botao from "../Botao";
import { menuState } from "../../state/atom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Janela from "../Janela";

const LoginSistema = () => {
    const navigate = useNavigate();
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(false)
    }

    const [id, setId] = useState('')
    const [senha, setSenha] = useState('')
    var idBB = "burguerboss"
    var senhaBB = "123"

    const validarLogin = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if(id === idBB && senha === senhaBB) {
            navigate('/bb')
            alterarStatus()
        }
        else if(id === idBB || senha === senhaBB) {
            alert("Id ou senha incorretos!")
        }
        else {
            alert("Erro ao logar. Tente novamente!")
        }
    }

    return(
        <Janela titulo="Login" conteudo={
            <form className="grid justify-items-center" onSubmit={validarLogin}>
                <div className="grid gap-8 my-12">
                    <input required type="text" placeholder="Id" className="input" id="id" onChange={(e) => setId(e.target.value)}/>
                    <input required type="password" placeholder="Senha" className="input" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <button type="submit">
                    <Botao children="Entrar"/>
                </button>
            </form>
        }/>
    )
}

export default LoginSistema;