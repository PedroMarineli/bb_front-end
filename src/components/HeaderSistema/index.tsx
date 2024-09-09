import { useNavigate } from "react-router-dom";
import BurguerBoss from "../BurguerBoss"

const HeaderSistema = () => {
    const navigate = useNavigate();
    const sair = () => {
        navigate("/")
    }

    return (
        <header className="flex items-center justify-around bg-seaBlue text-white py-2">
            <BurguerBoss />
            <span className="uppercase px-10 font-bold">Página</span>
            <div onClick={sair}>
                <img src="/icons/sair.png" alt="Sair" className="h-10 w-10 hover:cursor-pointer"/>
            </div>
        </header>
    )
}

export default HeaderSistema