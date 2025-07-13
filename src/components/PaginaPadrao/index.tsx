import { Outlet } from "react-router-dom";
import BotaoMenu from "../BotaoMenu";
import Menu from "../Menu";
import HeaderSistema from "../HeaderSistema";
import { useState } from "react";

const PaginaPadrao = () => {
<<<<<<< HEAD
    const [menu, setMenu] = useState(false)
    const mostrarMenu = () => setMenu(!menu)
=======
    const [menu, setMenu] = useState(false);

    const alterarStatus = () => {
        setMenu(!menu)
    }
>>>>>>> origin/main

    return (
        <main>
            <HeaderSistema />
            {menu && <Menu alterarStatus={alterarStatus}/>}
            <div onClick={alterarStatus}>
                <BotaoMenu />
            </div>
<<<<<<< HEAD
            <div className="m-32 lg:mx-60">
=======
            <div className="mx-32 lg:mx-60 my-32">
>>>>>>> origin/main
                <Outlet/>
            </div>
        </main>
    )
}

export default PaginaPadrao;