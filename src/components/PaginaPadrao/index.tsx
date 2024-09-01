import { Outlet } from "react-router-dom";
import HeaderInicio from "../../pages/Inicio/components/HeaderInicio";
import BotaoMenu from "../BotaoMenu";
import Menu from "../Menu";
import { useState } from "react";

const PaginaPadrao = () => {
    const [menu, setMenu] = useState(false);
    const mostrarMenu = () => setMenu(!menu);

    return (
        <main>
            <HeaderInicio />
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