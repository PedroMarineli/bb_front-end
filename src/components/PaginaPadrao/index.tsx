import { Outlet } from "react-router-dom";
import BotaoMenu from "../BotaoMenu";
import Menu from "../Menu";
import { useState } from "react";
import HeaderSistema from "../HeaderSistema";

const PaginaPadrao = () => {
    const [menu, setMenu] = useState(false);
    const mostrarMenu = () => setMenu(!menu);

    return (
        <main>
            <HeaderSistema />
            {menu && <Menu/>}
            <div onClick={mostrarMenu}>
                <BotaoMenu />
            </div>
            <div className="m-32">
                <Outlet/>
            </div>
        </main>
    )
}
export default PaginaPadrao;