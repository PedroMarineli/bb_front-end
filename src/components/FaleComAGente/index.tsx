import meios from "../../json/faleConosco.json";
import LogoBB from "/images/logoBB.png";

const FaleComAGente = () => {
    return (
        <div className="janela hidden">
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
    )
}

export default FaleComAGente;