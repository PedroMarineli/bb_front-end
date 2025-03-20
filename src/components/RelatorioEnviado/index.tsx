import Janela from "../Janela";
import LogoBB from "/images/logoBB.png";

const RelatorioEnviado = () => {
    return (
        <Janela titulo="Relatório Enviado" conteudo={
            <div className="grid justify-items-center gap-5">
                <p>O download começará em segundos...</p>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        }/>
    )
}

export default RelatorioEnviado;