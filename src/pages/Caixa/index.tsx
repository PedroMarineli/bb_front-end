import Botao from "../../components/Botao";

const Caixa = () => {
    const opcoes = [{
            pagamento: "Dinheiro"
        },
        {
            pagamento: "Pix"
        },
        {
            pagamento: "Cartão de Crédito"
        },
        {
            pagamento: "Cartão de Débito"
        }]

    return (
        <section className="telaBranca">
            <h1>Caixa</h1>
            <div className="flex items-center justify-between">
                <div>
                    <p>Opções de pagamento:</p>
                    <ul>
                        {opcoes.map((opcao) => (
                            <li className="flex">
                                <input type="checkbox" />
                                {opcao.pagamento}
                            </li>
                        ))}
                    </ul>
                </div>
                <Botao children="Finalizar Pedido"/>
            </div>
        </section>
    )
}
export default Caixa;