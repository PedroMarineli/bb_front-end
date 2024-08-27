import header from "../../../../json/header.json";
import BurguerBoss from "../../../../components/BurguerBoss";
import userIcon from "/icons/userIcon.png";

const HeaderInicio = () => {
    return (
        <header className="flex items-center justify-around bg-seaBlue text-white py-2">
            <BurguerBoss />
            <ul className="flex">
                {header.map((header) => (
                    <li className="uppercase px-10 font-bold">{header.opcao}</li>
                ))}
            </ul>
            <img src={userIcon} alt="usuario"/>
        </header>
    )
}

export default HeaderInicio;