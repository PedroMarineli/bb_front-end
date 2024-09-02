import meios from "../../json/faleConosco.json";
import LogoBB from "/images/logoBB.png";

const FaleComAGente = () => {
    return (
        <div className="grid justify-items-center">
            <div className="bg-black opacity-60 fixed top-0 right-0 bottom-0 left-0"/>
            <div className="janela">
                <h3 className="tituloJanela text-center">Fale com a gente</h3>
                <p>Tem alguma dúvida?! Alguma sugestão?! Alguma reclamação?!</p>
                <p>Entre em contato conosco por meio destes meios abaixo!</p>
                <ul>
                    {meios.map((meio) => (
                        <li className="flex gap-6">
                            <span>{meio.nome}</span>
                            <img src={meio.icone} alt={meio.nome} />
                            <span>{meio.texto}</span>
                        </li>
                    ))}
                </ul>
                <img src={LogoBB} alt="Logo BB"/>
            </div>
        </div>
    )
}

export default FaleComAGente;