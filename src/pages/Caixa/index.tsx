import Botao from "../../components/Botao";
import { useOrder } from "../../hooks/useOrder";

const Caixa = () => {
    const { listOrder, isLoading } = useOrder()

    const opcoes = [
        { pagamento: "Dinheiro" },
        { pagamento: "Pix" },
        { pagamento: "Cartão de Crédito" },
        { pagamento: "Cartão de Débito" }
    ]

    return (
        <section className="telaBranca grid gap-10">
            {isLoading ? <p>Carregando...</p> : <>
                {listOrder?.map(pedido => (
                    <div className='grid gap-10 text-center'>
                        <h2 className='text-2xl'>Mesa {pedido.desk?.id}</h2>
                        <table className="text-center w-full">
                            <thead>
                                <tr>
                                    <th>Item(ns)</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.orderItems?.map((item) => (
                                    <tr key={item.menuItem.id}>
                                        <td>{item.menuItem.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.menuItem.price?.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Total: R${pedido.totalValue?.toFixed(2)}</p>
                    </div>
                ))}
            </>}
            <div className="flex items-center justify-around">
                <div className="grid gap-2">
                    <p className="pl-6">Opções de pagamento:</p>
                    <ul className="grid gap-1">
                        {opcoes.map((opcao) => (
                            <li className="flex items-center gap-2">
                                <input type="checkbox" className="w-6 h-6 bg-transparent border-black rounded-2xl hover:ring-black"/>
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