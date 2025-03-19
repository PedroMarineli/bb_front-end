import { Outlet } from "react-router-dom";
import BotaoMenu from "../BotaoMenu";
import Menu from "../Menu";
import HeaderSistema from "../HeaderSistema";
import { useState } from "react";

const PaginaPadrao = () => {
    const [menu, setMenu] = useState(false);

    const alterarStatus = () => {
        setMenu(!menu)
    }

    return (
        <main>
            <HeaderSistema />
            {menu && <Menu alterarStatus={alterarStatus}/>}
            <div onClick={alterarStatus}>
                <BotaoMenu />
            </div>
            <div className="mx-32 lg:mx-60 my-32">
                <Outlet/>
            </div>
        </main>
    )
}
export default PaginaPadrao;