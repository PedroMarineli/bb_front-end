<<<<<<< HEAD
import CriarMenuItem from '../../components/CriarMenuItem';
import { useEffect, useState } from 'react';
import { useMenuItem } from '../../hooks/useMenuItem';
import { IMenuItem } from '../../interface/IMenu';
import AlterarMenuItem from './AlterarMenuItem';
import Botao from '../../components/Botao';

const AlterarCardapio = () => {
    const categorias: { [categoria: string]: IMenuItem[] } = {}
    const { data, isLoading } = useMenuItem()
    const [altera, setAltera] = useState(false)
    const [items, setItems] = useState<IMenuItem[]>([])
    const alterarAltera = () => {
        setAltera(!altera)
    }
    
    useEffect(() => {
        if (data?.content) {
            setItems(data.content); 
        }
    }, [data?.content])


    // Organizar os itens por categoria
    items.forEach(item => {
        if (!categorias[item.category]) {
            categorias[item.category] = []
        }
        categorias[item.category].push(item)
    })

    return (
        <section className="telaBranca grid gap-10">
            {isLoading ? <p>Carregando...</p> : <>
                {Object.keys(categorias).map(categoria => (
                    <div key={categoria} className='grid gap-5 break-before'>
                        <h2 className='text-2xl'>{categoria}</h2>
                        <ul className='grid gap-2'>
                            {categorias[categoria].map(item => (
                                <AlterarMenuItem key={item.id} {...item}/>
                            ))}
                        </ul>
                    </div>
                ))}
            </>}
            <div className='grid gap-7 justify-center'>
                <button onClick={alterarAltera}><Botao>Adicionar novo item de menu:</Botao></button>
                {altera && <CriarMenuItem closeModal={alterarAltera}/>}
            </div>
=======
import { useEffect, useState } from 'react';
import cardapio from '../../mocks/cardapio.json';
import lataLixo from "/icons/lata-de-lixo.png";
import Botao from '../../components/Botao';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menuState } from '../../state/atom';
import Exclusao from '../../components/Exclusao';

const AlterarCardapio = () => {
    const aberto = useSetRecoilState(menuState)
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

    const [lista, setLista] = useState(cardapio);

    function excluir(nome: string) {
        alterarStatus()
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
                                <img src={lataLixo} alt="Lata de lixo" className='h-9 cursor-pointer'/>
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
                                        <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
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
            { fechado && <Exclusao/>}
>>>>>>> origin/main
        </section>
    )
}

export default AlterarCardapio
