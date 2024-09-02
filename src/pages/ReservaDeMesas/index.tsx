import Botao from "../../components/Botao";

const ReservaDeMesas = () => {
    return(
        <section className="telaBranca">
            <h1>Reserva De Mesas</h1>
            <div className="flex justify-around">
                <Botao children="Alterar Mesas"/>
                <div className="flex gap-4 items-center justify-between opacity-55">
                    <p>Quantidade de mesas:</p>
                    <input type="text" />
                    <Botao children="Atualizar"/>
                </div>
            </div>
        </section>
    )
}
export default ReservaDeMesas;