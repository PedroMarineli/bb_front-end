import { Link } from "react-router-dom";

const CadastroDePedidos = () => {
    return (
        <div>
            <section className="telaBranca">
                <h1>Cadastro De Pedidos</h1>
            </section>
            <button>
                <Link to='/bb-alterar-cardapio'>Alterar Cardápio</Link>
            </button>
        </div>
    )
}
export default CadastroDePedidos;