import { useEffect, useState } from 'react';
import cardapio from '../../mocks/cardapio.json';
import lataLixo from "/icons/lata-de-lixo.png";
import Botao from '../../components/Botao';

const AlterarCardapio = () => {
    const [lista, setLista] = useState(cardapio);

    function excluir(nome: string) {
        return setLista(listaAntiga => listaAntiga.filter(evento => evento.nome !== nome))
    }

    useEffect(() => {
        setLista(cardapio);
      }, [cardapio]);
    
      const alterarCardapio = () => {
        /*setLista({
          ...lista,
          [event.target.name]: event.target.value,
        });*/
      };
    
      const submeterForm = () => {
        /*event.preventDefault();
    
        // Aqui você implementaria a lógica para salvar as alterações
        console.log('Dados alterados:', lista);*/
      };

    return (
        <section className="telaBranca">
            <form onSubmit={submeterForm} className='grid gap-7'>
                {lista.map(categoria => (
                    <div className='grid gap-7'>
                        <div className='flex justify-center gap-5'>
                            <input type="text" name="nome" value={categoria.nome} onChange={alterarCardapio} className='inputAlterar text-2xl'></input>
                            <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                            <div onClick={() => excluir(categoria.nome)}>
                                <img src={lataLixo} alt="Lata de lixo" className='h-9'/>
                            </div>
                        </div>
                        <ul className='grid gap-7'>
                        {categoria.itens.map((item) => (
                            <li key={item.nome}>
                                <div className='flex justify-between gap-5 items-center'>
                                    <input type="text" name="nome" value={item.nome} onChange={alterarCardapio} className='inputAlterar w-52'></input>
                                    <input type="text" name="descricao" value={item.descricao} onChange={alterarCardapio} className='inputAlterar w-full'></input>
                                    <input type="text" name="preco" value={item.preco} onChange={alterarCardapio} className='inputAlterar w-20'></input>
                                    <div onClick={() => excluir(item.nome)}>
                                        <img src={lataLixo} alt="Lata de lixo" className='w-12'/>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                ))}
                <div className='grid gap-7 justify-center'>
                    <div className='flex justify-center gap-5'>
                        <h2 className='text-2xl'>Adicionar categoria:</h2>
                        <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                    </div>
                    <div className="flex justify-center">
                        <Botao>Alterar</Botao>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default AlterarCardapio;