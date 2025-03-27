import { useEffect, useState } from 'react';
import cardapio from '../../mocks/cardapio.json';
import lataLixo from "../../../public/icons/lata-de-lixo.png";
import Botao from '../../components/Botao';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menuState } from '../../state/atom';
import Exclusao from '../../components/Exclusao';
import CriarMenuItem from '../../components/CriarMenuItem';
import { useMenuItem } from '../../hooks/useMenuItem';
import { IMenuItem } from '../../interface/IMenuItem';

const AlterarCardapio = () => {
    const { data, isLoading } = useMenuItem();
    const [altera, setAltera] = useState(false)
    const alterarAltera = () => {
        setAltera(!altera)
    }

    function excluir(id: number) {
        //alterarStatus()
        //return setLista(listaAntiga => listaAntiga.filter(evento => evento.id !== id))
    }
    
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

    console.log(data)

    return (
        <section className="telaBranca grid gap-10">
            <form onSubmit={submeterForm} className='grid gap-7'>
                {isLoading ? <p>Carregando...</p> : <>
                    {data?.items?.map((item) => 
                        <li key={item.name} className='list-none'>
                            <div className='flex justify-between gap-5 items-center'>
                                <input type="text" name="nome" value={item.name} onChange={alterarCardapio} className='inputAlterar w-52'></input>
                                <input type="text" name="descricao" value={item.category} onChange={alterarCardapio} className='inputAlterar w-full'></input>
                                <input type="text" name="preco" value={item.price} onChange={alterarCardapio} className='inputAlterar w-20'></input>
                                {/* <div onClick={() => excluir(item.id)}> */}
                                <div>
                                    <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                                </div>
                            </div>
                        </li>
                    )}
                </>}
                <>
                    {/* {Array.isArray(data) && data?.map((categoria) => (
                        <div className='grid gap-7'>
                            <div className='flex justify-center gap-5'>
                                <input type="text" name="nome" value={categoria.nome} onChange={alterarCardapio} className='inputAlterar text-2xl'></input>
                                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                                <div onClick={() => excluir(categoria.nome)}>
                                    <img src={lataLixo} alt="Lata de lixo" className='h-9 cursor-pointer'/>
                                </div>
                            </div>
                            <ul className='grid gap-7'>
                            {categoria.items.map((item: any) => (
                                <li key={item.name}>
                                    <div className='flex justify-between gap-5 items-center'>
                                        <input type="text" name="nome" value={item.name} onChange={alterarCardapio} className='inputAlterar w-52'></input>
                                        <input type="text" name="descricao" value={item.descricao} onChange={alterarCardapio} className='inputAlterar w-full'></input>
                                        <input type="text" name="preco" value={item.price} onChange={alterarCardapio} className='inputAlterar w-20'></input>
                                        <div onClick={() => excluir(item.id)}>
                                            <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                                        </div> 
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    ))} */}
                </>
            </form>
            <div className='grid gap-7 justify-center'>
                <div className='flex justify-center gap-5'>
                    <h2 className='text-2xl'>Adicionar categoria:</h2>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                </div>
                <div className="flex justify-center">
                    <Botao>Alterar</Botao>
                </div>
                <button onClick={alterarAltera}>Novo Item de Menu</button>
                {altera && <CriarMenuItem closeModal={alterarAltera}/>}
            </div>
        </section>
    )
}
//{ fechado && <Exclusao/>} fica entre o form e o section
export default AlterarCardapio;