import meios from "../../json/faleConosco.json";
import LogoBB from "/images/logoBB.png";

const FaleComAGente = () => {
    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <h3 className="tituloJanela text-center">Fale com a gente</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6"/>
                </div>
                <p>Tem alguma dúvida?! Alguma sugestão?! Alguma reclamação?!</p>
                <p>Entre em contato conosco por meio destes meios abaixo!</p>
                <ul className="grid gap-5 my-8">
                    {meios.map((meio) => (
                        <li className="flex gap-6">
                            <span>{meio.nome}</span>
                            <img src={meio.icone} alt={meio.nome} />
                            <span>{meio.texto}</span>
                        </li>
                    ))}
                </ul>
                {/* <button onClick={aoFechar} className="justify-items-center"> */}
                    <img src={LogoBB} alt="Logo BB"/>
                {/* </button> */}
            </div>
        </div>
    )
}

export default FaleComAGente;