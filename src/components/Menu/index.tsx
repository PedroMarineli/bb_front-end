import { Link } from "react-router-dom";
import paginas from "../../json/paginas.json";

const Menu = () => {
    return (
        <div className="menu fixed right-0 top-0">
            <ul className="">
                {paginas.map((pagina) => (
                    <li>
                        <Link to={pagina.link}>
                            <div className="flex items-center gap-3 py-4 border-b">
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