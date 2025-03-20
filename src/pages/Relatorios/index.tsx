//import SetaEsquerda from "../../../public/icons/seta-esquerda.png";
import SetaEsquerda from "../../../public/icons/cozinha.png";
//import SetaDireita from "../../../public/icons/seta-direita.png";
import SetaDireita from "../../../public/icons/cozinha.png";
import { useState } from "react";
import OcupacaoMesasPorDia from "../../components/Relatorios";
import PratosMaisPedidos from "../../components/Relatorios/index2";
import PedidosPorDias from "../../components/Relatorios/index3";

const Relatorios = () => {
    const [relatorioAtual, setRelatorioAtual] = useState(0);
    const relatorios = [<OcupacaoMesasPorDia/>, <PratosMaisPedidos/>, <PedidosPorDias/>];
  
    const proximoRelatorio = () => {
      setRelatorioAtual((relatorioAnterior) => (relatorioAnterior + 1) % relatorios.length);
    };
  
    const relatorioAnterior = () => {
      setRelatorioAtual((relatorioAnterior) => (relatorioAnterior - 1 + relatorios.length) % relatorios.length);
    };

    return(
        <div>
            <div onClick={proximoRelatorio} className="flex flex-col absolute bottom-1/2 right-20 p-5 bg-white rounded-full border-solid border-2 border-black hover:cursor-pointer">
                <img src={SetaDireita} alt="Seta Direita" className="w-8 h-8"/>
            </div>
                <section className="telaBranca grid gap-10 h-96">
                    {relatorios[relatorioAtual]}
                </section>
            <div onClick={relatorioAnterior} className="flex flex-col absolute bottom-1/2 left-20 p-5 bg-white rounded-full border-solid border-2 border-black hover:cursor-pointer">
                <img src={SetaEsquerda} alt="Seta Esquerda" className="w-8 h-8"/>
            </div>
        </div>
    )
}
export default Relatorios;