import { useEffect, useState } from "react";
//import lataLixo from "/icons/lata-de-lixo.png";
import Botao from "../Botao";
import { IUsuario } from "../../interface/IUsuario";

interface Props {
    //setUsuarios: React.Dispatch<React.SetStateAction<IUsuario[]>>
    alterarAltera: React.MouseEventHandler<HTMLImageElement>
}

const AlterarUsuario = ({alterarAltera}: Props) => {
    const [lista, setLista] = useState<IUsuario[] | []>([])

    /*function excluir(id: string) {
        return setLista(listaAntiga => listaAntiga.filter(evento => evento.id !== id))
    }

    useEffect(() => {
        setLista(lista);
      }, [lista]);*/
    
      /*const alterarUsuario = () => {
        setLista({
          ...lista,
          [event.target.name]: event.target.value,
        });
      };
    
      const submeterForm = () => {
        event.preventDefault();
    
        // Aqui você implementaria a lógica para salvar as alterações
        console.log('Dados alterados:', lista);
      };*/

    return (
        <div className="grid justify-items-center">
            <div className="overlay"/>
            <div className="janela">
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <h3 className="tituloJanela text-center">Alterar</h3>
                    <img src="/icons/fechar.png" alt="Fechar" className="h-6 w-6 hover:cursor-pointer" onClick={alterarAltera}/>
                </div>
                <form className="grid justify-items-center">
                    <div className="grid gap-8 my-12">
                        <input required type="text" placeholder="Id" className="input" id="id"/>
                        <input required type="text" placeholder="Senha" className="input" id="senha"/>
                        <select className="input">
                            <option value=""></option>
                            <option value="Funcionário">Funcionário</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                    <button type="submit">
                        <Botao children="Alterar"/>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AlterarUsuario;

/*
<select className="input" onChange={(e) => setHierarquia(e.target.value)}>
    <option value=""></option>
    <option value="Funcionário">Funcionário</option>
    <option value="Administrador">Administrador</option>
</select>

{lista.map(usuario => (
    <form className="grid justify-items-center" onSubmit={submeterForm}>
        <div className="grid gap-8 my-12">
            <input required type="text" value={usuario.id} onChange={alterarUsuario} className="input" id="id"/>
            <input required type="text" value={usuario.senha} onChange={alterarUsuario} className="input" id="senha"/>



        </div>
        <button type="submit">
            <Botao children="Alterar"/>
        </button>
        <div onClick={() => excluir(usuario.id)}>
            <img src={lataLixo} alt="Lata de lixo" className='w-12'/>
        </div>
    </form>
))}
*/