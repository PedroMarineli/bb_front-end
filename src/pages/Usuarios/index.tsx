import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import CadastraUsuario from "../../components/CadastraUsuario";
import { useState } from "react";
import { IUsuario } from "../../types/IUsuario";

const Usuarios = () => {
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

    const [usuarios, setUsuarios] = useState<IUsuario[] | []>([])

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
                    </div>
                ))}
            </section>
            )}
            <button className="pt-5">
                <button onClick={alterarStatus}>Cadastrar / Alterar</button>
            </button>
            { fechado && <CadastraUsuario setUsuarios={setUsuarios}/>}
        </div>
    )
}
export default Usuarios;