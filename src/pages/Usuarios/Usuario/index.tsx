import { IUpdateUser } from "../../../interface/IUsers";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import { useUserMutate } from "../../../hooks/useUserMutate";
import { useState } from "react";
import AlterarUsuario from "./AlteraUsuario";

const Usuario = (user: IUpdateUser) => {
    const { deleteMutate, putMutate } = useUserMutate()
    const [formVisivel, setFormVisivel] = useState(false)
    
    const deleteUser = (id: any) => {
        deleteMutate.mutate(id)
    }

    const alterarUser = (data: IUpdateUser) => {
        console.log({ data })

        putMutate.mutate(data)
    }

    const callAlterarUser = () => {
        setFormVisivel(true)
    }

    if(formVisivel) {
        return <AlterarUsuario onClose={() => setFormVisivel(false)} onSubmit={alterarUser} { ...user } />
    }

    return(
        <div key={user.id} className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
                <img src="./icons/userIconBlack.png" alt="Usuário"/>
                {/* <p>{user.hierarquia}</p> */}
            </div>
            <p>{user.id}</p>
            <p>{user.password}</p>
            <div onClick={() => deleteUser(user.id)}>
                <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
            </div>
            <button onClick={() => callAlterarUser()}>Alterar</button>
        </div>
    )
}

export default Usuario;