import { Outlet } from "react-router-dom";
import HeaderInicio from "../../pages/Inicio/components/HeaderInicio";
import BotaoMenu from "../BotaoMenu";
import Menu from "../Menu";

const PaginaPadrao = () => {

    return (
        <main>
            <HeaderInicio/>
            <Menu />
            <BotaoMenu />
            <div className="m-32">
                <Outlet/>
            </div>
        </main>
    )
}
export default PaginaPadrao;