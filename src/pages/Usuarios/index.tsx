import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import CadastraUsuario from "../../components/CadastraUsuario";
import lataLixo from "../../../../public/icons/lata-de-lixo.png";
import { useState } from "react";
import AlterarUsuario from "../../components/AlteraUsuario";
import { useUsers } from "../../hooks/useUser";
import { useUserMutate } from "../../hooks/useUserMutate";
import { IUpdateUser } from "../../interface/IUsers";

const Usuarios = () => {
    const { deleteMutate, putMutate } = useUserMutate()
    const { users, isLoading } = useUsers()
    const [formVisivel, setFormVisivel] = useState(false)
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

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
        <div>
            {users?.content.length === 0 ? 
                (<section className="telaBranca grid gap-5">
                    <p>Nenhum usuário cadastrado!</p>
                </section>) : 
            (
                <section className="telaBranca grid gap-5">
                        {isLoading ? <p>Carregando...</p> : <>
                            {users?.content.map(user => (
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