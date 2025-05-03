import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import userIcon from "../../../../public/icons/blackUserIcon.png";
import { IUpdateUser } from "../../../interface/IUsers";
import { useUserMutate } from "../../../hooks/useUserMutate";
import { useState } from "react";
import AlterarUsuario from "./AlteraUsuario";
import { useUsuarioLogado } from "../../../context/UserLogadoContext";

const Usuario = (user: IUpdateUser) => {
    const { deleteMutate, putMutate } = useUserMutate()
    const [formVisivel, setFormVisivel] = useState(false)
    const { usuarioLogado } = useUsuarioLogado()
    
    const deleteUser = (id: any) => {
        deleteMutate.mutate(id)
    }

    const alterarUser = (data: IUpdateUser) => {
        putMutate.mutate(data)
    }

    const callAlterarUser = () => {
        setFormVisivel(true)
    }

    if(formVisivel) {
        return <AlterarUsuario onClose={() => setFormVisivel(false)} onSubmit={alterarUser} { ...user } />
    }

    return(
        <div>
            <div key={user.id} className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <img src={userIcon} alt="Usuário"/>
                </div>
                <p>{user.username}</p>
                <p>{user.role}</p>
                { usuarioLogado?.role == "ADMIN" &&                 
                    <div onClick={() => deleteUser(user.id)}>
                        <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                    </div>
                }
                { usuarioLogado?.role == "ADMIN" && <button onClick={() => callAlterarUser()}>Alterar</button> }
            </div>
        </div>
    )
}

export default Usuario;