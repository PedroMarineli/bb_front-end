import { Link } from "react-router-dom";
import paginas from "../../json/paginas.json";
import { MouseEventHandler } from "react";

interface Props {
    alterarStatus: MouseEventHandler<HTMLDivElement>
}

const Menu = ({alterarStatus}: Props) => {
    return (
        <div className="menu fixed right-0 top-0 z-10">
            <ul>
                {paginas.map((pagina) => (
                    <li>
                        <Link to={pagina.link}>
                            <div className="flex items-center gap-3 py-4 border-b" onClick={alterarStatus}>
                                <img src={pagina.icon} alt={pagina.nome} className="w-7 h-7"/>
                                <span>{pagina.nome}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;