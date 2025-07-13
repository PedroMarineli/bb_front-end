import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
<<<<<<< HEAD
import { useUsers } from "../../hooks/useUser";
import CadastraUsuario from "../../components/CadastraUsuario";
import Usuario from "./Usuario";
import { useUsuarioLogado } from "../../context/UserLogadoContext";

const Usuarios = () => {
    const { users, isLoading } = useUsers()
    const fechado = useRecoilValue(menuState)
    const aberto = useSetRecoilState(menuState)
    const { usuarioLogado } = useUsuarioLogado()

    const cadastrarUsuario = () => {
        aberto(true)
    }

    return(
        <div>
            {users?.content.length === 0 ? 
                (<section className="telaBranca grid gap-5">
                    <p>Nenhum usuário cadastrado!</p>
                </section>) : 
                (<section className="telaBranca grid gap-5">
                    {isLoading ? <p>Carregando...</p> : <>
                        {users?.content.map(user => (
                            <Usuario key={user.id} {...user}/>
                        ))}
                    </>}
                </section>)
            }
            { usuarioLogado?.role == "ADMIN" && <button className="pt-5 text-right" onClick={cadastrarUsuario}> Cadastrar </button> }
            { fechado && <CadastraUsuario /> }
        </div>
    )
}

=======
import CadastraUsuario from "../../components/CadastraUsuario";
import { useState } from "react";
import { IUsuario } from "../../types/IUsuario";
import AlterarUsuario from "../../components/AlteraUsuario";

const Usuarios = () => {
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

    const [usuarios, setUsuarios] = useState<IUsuario[] | []>([])

    const [altera, setAltera] = useState(false)
    const alterarAltera = () => {
        setAltera(!altera)
    }

    return(
        <div>
            {usuarios.length === 0 ? 
            (<section className="telaBranca grid gap-5">
                <p>Nenhum usuário cadastrado!</p>
            </section>) : 
            (
            <section className="telaBranca grid gap-5">
                {usuarios.map(usuario => (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5 items-center">
                            <img src="./icons/userIconBlack.png" alt="Usuário"/>
                            <p>{usuario.hierarquia}</p>
                        </div>
                        <p>{usuario.id}</p>
                        <p>{usuario.senha}</p>
                        <button onClick={alterarAltera}>Alterar</button>
                    </div>
                ))}
            </section>
            )}
            <button className="pt-5 text-right">
                <button onClick={alterarStatus}>Cadastrar</button>
            </button>
            { fechado && <CadastraUsuario setUsuarios={setUsuarios}/>}
            { altera && <AlterarUsuario alterarAltera={alterarAltera}/> }
        </div>
    )
}
>>>>>>> origin/main
export default Usuarios;