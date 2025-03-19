import { useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";

interface JanelaProps {
  titulo: string;
  conteudo: React.ReactNode;
}

const Janela: React.FC<JanelaProps> = ({ titulo, conteudo }) => {
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(false)
    }

  return (
    <div className="grid justify-items-center">
        <div className="overlay"/>
        <div className="janela">
            <div className="flex justify-between items-center">
                <div></div>
                <h3 className="tituloJanela text-center">{titulo}</h3>
                <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={alterarStatus}/>
            </div>
            {conteudo}
        </div>
    </div>
  );
};

export default Janela;