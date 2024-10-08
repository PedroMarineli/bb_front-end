import Maleta from "/icons/walletIcon.png";
import Telefone from "/icons/telephoneIcon.png";
import Logo from "/images/logoBB.png";
import Twitter from "/icons/twitterIcon.png";
import Facebook from "/icons/facebookIcon.png";
import Whats from "/icons/whatsapIcon.png";
import Insta from "/icons/instagramIcon.png";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../../../state/atom";

const Footer = () => {
    //const { clique } = useAbertoFechado()

    // const aberto = useSetRecoilState(menuState)
    // const alterarStatus = () => {
    //     aberto(true)
    // }

    return (
        <footer className="bg-seaBlue flex items-center justify-around py-10 text-lg">
            <img src={Logo} alt="LogoBB" />
            <ul>
                <li className="flex items-center py-2 gap-4">
                    <img src={Maleta} alt="Maleta trabalho" className="w-8 h-8" />
                    <span>Trabalhe Conosco</span>
                </li>
                <li className="flex items-center py-2 gap-4 hover:cursor-pointer">
                    <img src={Telefone} alt="Contato" className="w-8 h-8" />
                    <span>Fale com a gente</span>
                </li>
                <li className="flex items-center py-2 gap-4">
                    <img src={Logo} alt="LogoBB" className="w-8 h-8" />
                    <span>Burguer Boss - 2024 - Todos os direitos reservados</span>
                </li>
            </ul>
            <Link to="https://www.fatecourinhos.edu.br">
                <ul className="flex gap-8">
                    <li><img src={Twitter} alt="Twitter" className="w-10 h-10"/></li>
                    <li><img src={Facebook} alt="Facebook" className="w-10 h-10"/></li>
                    <li><img src={Whats} alt="Whatsapp" className="w-10 h-10"/></li>
                    <li><img src={Insta} alt="Instagram" className="w-10 h-10"/></li>
                </ul>
            </Link>
        </footer>
    )
}

export default Footer