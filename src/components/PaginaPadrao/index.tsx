import { Outlet } from "react-router-dom";
import HeaderInicio from "../../pages/Inicio/components/HeaderInicio";

const PaginaPadrao = () => {
    return (
        <main>
            <HeaderInicio/>
            <div className="m-32">
                <Outlet/>
            </div>
        </main>
    )
}
export default PaginaPadrao;