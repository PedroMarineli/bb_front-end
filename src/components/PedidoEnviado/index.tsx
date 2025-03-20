import Janela from "../Janela";
import LogoBB from "../../../public/images/logoBB.png";

const PedidoEnviado = () => {
    return (
        <Janela titulo="Pedido Enviado" conteudo={
            <div className="grid justify-items-center gap-5">
                <p>Pedido enviado com sucesso!</p>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        }/>
    )
}

export default PedidoEnviado;