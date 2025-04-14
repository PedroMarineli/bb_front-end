import { useSetRecoilState } from "recoil";
import BurguerBoss from "../../../../components/BurguerBoss";
import userIcon from "/icons/userIcon.png";
import { HashLink as Link} from 'react-router-hash-link';
import { menuState } from "../../../../state/atom";

const HeaderInicio = () => {
    const opcoes = [
        {
            opcao: "Home",
            id: "home"
        },
        {
            opcao: "Cardápio",
            id: "cardapio"
        },
        {
            opcao: "Unidades",
            id: "unidades"
        },
        {
            opcao: "Sobre Nós",
            id: "sobreNos"
        }
    ]

    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }

    return (
        <header className="flex items-center justify-around bg-seaBlue text-white py-2">
            <BurguerBoss />
            <ul className="flex">
                {opcoes.map((opcao) => (
                    <li key={opcao.id} className="uppercase px-10 font-bold">
                        <Link key={opcao.id} to={`#${opcao.id}`} smooth={true}>{opcao.opcao}</Link>
                    </li>
                ))}
            </ul>
            <div onClick={alterarStatus}>
                <img src={userIcon} alt="usuario" className="hover:cursor-pointer"/>
            </div>
        </header>
    )
}

export default HeaderInicio;