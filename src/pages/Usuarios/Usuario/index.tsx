import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import alterar from "../../../../public/icons/alterar.png";
import userIcon from "../../../../public/icons/blackUserIcon.png";
import { IUpdateUser } from "../../../interface/IUsers";
import { useUserMutate } from "../../../hooks/useUserMutate";
import { useState } from "react";
import AlterarUsuario from "./AlteraUsuario";
import { useUsuarioLogado } from "../../../context/UserLogadoContext";
import { deleteState } from "../../../state/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Avisos from "../../../components/Avisos";

const Usuario = (user: IUpdateUser) => {
    const { deleteMutate, putMutate } = useUserMutate()
    const [formVisivel, setFormVisivel] = useState(false)
    const { usuarioLogado } = useUsuarioLogado()
    const [userToDeleteId, setUserToDeleteId] = useState(null)
    const deleteFechado = useRecoilValue(deleteState)
    const deleteAberto = useSetRecoilState(deleteState)
   
    const corfirmaExcluir = (id: any) => {
        deleteAberto(true)
        setUserToDeleteId(id)
    }

    const deleteUser = (id: any) => {
        deleteMutate.mutate(id)
        deleteAberto(false)
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
                    <div className="flex gap-16">
                        <div onClick={() => corfirmaExcluir(user.id)}>
                            <img src={lataLixo} alt="Lata de lixo" className='w-8 cursor-pointer'/>
                        </div>
                        <div onClick={() => callAlterarUser()}>
                            <img src={alterar} alt="Alterar" className='w-8 cursor-pointer'/>
                        </div>
                    </div>             
                }
            </div>
            { deleteFechado && <Avisos title="Excluir Usuário" text={(
                <div className='grid gap-8 justify-center'>
                    <p>Tem certeza que quer excluir?! Essa ação não terá mais volta.</p>
                    <button onClick={() => userToDeleteId !== null && deleteUser(userToDeleteId)}>Excluir</button>
                </div>
            )}/> }
        </div>
    )
}

export default Usuario;