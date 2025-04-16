import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useUsers } from "../../hooks/useUser";
import CadastraUsuario from "../../components/CadastraUsuario";
import Usuario from "./Usuario";

const Usuarios = () => {
    const { users, isLoading } = useUsers()
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

    return(
        <div>
            {users?.content.length === 0 ? 
                (<section className="telaBranca grid gap-5">
                    <p>Nenhum usuário cadastrado!</p>
                </section>) : 
            (
                <section className="telaBranca grid gap-5">
                        {isLoading ? <p>Carregando...</p> : <>
                            {users?.content.map(user => (
                                <Usuario key={user.id} {...user}/>
                            ))}
                        </>}
                </section>
            )}
            <button className="pt-5 text-right">
                <button onClick={alterarStatus}>Cadastrar</button>
            </button>
            { fechado && <CadastraUsuario />}
        </div>
    )
}
export default Usuarios;