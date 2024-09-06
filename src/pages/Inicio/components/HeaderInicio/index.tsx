import BurguerBoss from "../../../../components/BurguerBoss";
import userIcon from "/icons/userIcon.png";
import { HashLink as Link} from 'react-router-hash-link';

const HeaderInicio = () => {
    const opcoes = [
        {
            opcao: "Home",
            link: "/home#home"
        },
        {
            opcao: "Cardápio",
            link: "/home#cardapio"
        },
        {
            opcao: "Unidades", 
            link: "/home#unidades" 
        },
        {
            opcao: "Sobre Nós", 
            link: "/home#sobreNos" 
        }
    ]

    return (
        <header className="flex items-center justify-around bg-seaBlue text-white py-2">
            <BurguerBoss />
            <ul className="flex">
                {opcoes.map((opcao) => (
                    <li className="uppercase px-10 font-bold">
                        <Link smooth to={opcao.link}>{opcao.opcao}</Link>
                    </li>
                ))}
            </ul>
            <Link to={"/bb"}>
                <img src={userIcon} alt="usuario"/>
            </Link>
        </header>
    )
}

export default HeaderInicio;