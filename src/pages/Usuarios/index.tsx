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
            <section className="telaBranca">
                {usuarios.map(usuario => (
                    <div className="flex justify-between">
                        <img src="./icons/userIcon.png" alt="Usuário" className="text-black"/>
                        <p>{usuario.id}</p>
                        <p>{usuario.senha}</p>
                        <p>{usuario.hierarquia}</p>
                    </div>
                ))}
            </section>
            <button className="pt-5">
                <button onClick={alterarStatus}>Cadastrar / Alterar</button>
            </button>
            { fechado && <CadastraUsuario setUsuarios={setUsuarios}/>}
        </div>
    )
}
export default Usuarios;