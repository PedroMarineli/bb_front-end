import Janela from "../Janela";
import LogoBB from "../../../public/images/logoBB.png";

interface AvisosProps {
    title: string;
    text: string;
  }
  
  const Avisos = ({ title, text }: AvisosProps) => {
    return (
        <Janela titulo={title} conteudo={
            <div className="grid justify-items-center gap-5">
                <p>{text}</p>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        }/>
    )
}

export default Avisos;