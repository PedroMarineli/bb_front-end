<<<<<<< HEAD:src/pages/Inicio/components/FaleComAGente/index.tsx
import meios from "../../../../json/faleConosco.json";
import LogoBB from "../../../../../public/images/logoBB.png";
=======
import meios from "../../json/faleConosco.json";
import LogoBB from "/images/logoBB.png";
>>>>>>> origin/main:src/components/FaleComAGente/index.tsx

interface Props {
    alterarStatus: React.MouseEventHandler<HTMLImageElement>
}

const FaleComAGente = ({alterarStatus}: Props) => {
    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela grid justify-items-center gap-10">
                <div className="flex justify-between items-center w-full">
                    <div></div>
                    <h3 className="tituloJanela text-center">Fale com a gente</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={alterarStatus}/>
                </div>
                <div className="grid gap-1 justify-items-center">
                    <p>Tem alguma dúvida?! Alguma sugestão?! Alguma reclamação?!</p>
                    <p>Entre em contato conosco por meio destes meios abaixo!</p>
                </div>
                <ul className="grid gap-3 justify-items-center">
                    {meios.map((meio) => (
<<<<<<< HEAD:src/pages/Inicio/components/FaleComAGente/index.tsx
                        <li className="flex gap-5 items-center">
                            <span>{meio.nome}</span>
                            <img src={meio.icone} alt={meio.nome} className="w-8"/>
=======
                        <li className="flex gap-6 items-center">
                            <span>{meio.nome}</span>
                            <img src={meio.icone} alt={meio.nome} className="w-9"/>
>>>>>>> origin/main:src/components/FaleComAGente/index.tsx
                            <span>{meio.texto}</span>
                        </li>
                    ))}
                </ul>
                <div className="grid justify-items-center">
                    <img src={LogoBB} alt="Logo BB"/>
                </div>
            </div>
        </div>
    )
}

export default FaleComAGente;