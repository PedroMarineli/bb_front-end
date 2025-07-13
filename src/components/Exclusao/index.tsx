import Janela from "../../components/Janela";
import LogoBB from "../../../public/images/logoBB.png";

const Exclusao = () => {
    return (
        <Janela titulo="Exclusão" conteudo={
            <div className="grid justify-items-center gap-5">
                <p>Exclusão feita com sucesso!</p>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        }/>
    )
}

export default Exclusao;