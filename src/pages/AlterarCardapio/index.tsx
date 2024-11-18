import { useState } from 'react';
import cardapio from '../../mocks/cardapio.json';

const AlterarCardapio = () => {
    const [lista, setLista] = useState(cardapio);

    function excluir(nome: string) {
        return setLista(listaAntiga => listaAntiga.filter(evento => evento.nome !== nome))
    }

    return (
        <section className="telaBranca">
            {lista.map(categoria => (
                <div className='grid gap-7'>
                    <h2 className='text-2xl'>{categoria.nome}:</h2>
                    <ul className='grid gap-7'>
                    {categoria.itens.map((item) => (
                        <li key={item.nome}>
                            <div className='flex'>
                                <p>{item.nome}: {item.descricao} - R${item.preco.toFixed(2)}</p>
                                <p>aqui terá coisas para mudar</p>
                                <td><button onClick={() => excluir(item.nome)}>Excluir</button></td>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}
export default AlterarCardapio;