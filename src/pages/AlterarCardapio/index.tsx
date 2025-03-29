import { useEffect, useState } from 'react';
import cardapio from '../../mocks/cardapio.json';
import lataLixo from "../../../public/icons/lata-de-lixo.png";
import Botao from '../../components/Botao';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menuState } from '../../state/atom';
import Exclusao from '../../components/Exclusao';
import CriarMenuItem from '../../components/CriarMenuItem';
import { useMenuItem } from '../../hooks/useMenuItem';
import { IMenu, IMenuItem } from '../../interface/IMenu';
import { useMenuItemMutate } from '../../hooks/UseMenuItemMutate';

const AlterarCardapio = () => {
    const { data, isLoading, refetch } = useMenuItem()
    const [altera, setAltera] = useState(false)
    const [items, setItems] = useState<IMenuItem[]>([])
    // const [name, setName] = useState(menu.name)
    // const [price, setPrice] = useState(menu.price)
    // const [category, setCategory] = useState(menu.category)
    // const [available, setAvailable] = useState(menu.available)
    const [id, setId] = useState(4)
    const { putMutate } = useMenuItemMutate()
    const alterarAltera = () => {
        setAltera(!altera)
    }
    
    useEffect(() => {
        if (data?.items) {
            setItems(data.items); 
        }
    }, [data?.items])
    
    console.log(items)
    console.log(data)

    function excluir(id: number) {
        //alterarStatus()
        //return setLista(listaAntiga => listaAntiga.filter(evento => evento.id !== id))
    }
    
    const alterarCardapio = (event: React.FormEvent) => {
        event.preventDefault()
        items.forEach((item) => {
          putMutate.mutate(item);
        })
        refetch()
    }

    const handleInputChange = (id: number | undefined, field: keyof IMenuItem, value: any) => {
        setItems(items.map((item) => {
          if (item.id === id) {
            return { ...item, [field]: value };
          }
          return item;
        }));
      };

    return (
        <section className="telaBranca grid gap-10">
            <form onSubmit={alterarCardapio} className='grid gap-7'>
                {isLoading ? <p>Carregando...</p> : <>
                    {items.map((item) => 
                        <li key={item.id} className='list-none'>
                            <div className='flex justify-between gap-5 items-center'>
                                <input type="text" name="nome" value={item.name} onChange={(e) => handleInputChange(item.id, 'name', e.target.value)} className='inputAlterar w-52'></input>
                                <input type="text" name="descricao" value={item.category} onChange={(e) => handleInputChange(item.id, 'category', e.target.value)} className='inputAlterar w-full'></input>
                                <input type="text" name="preco" value={item.price.toString()} onChange={(e) => handleInputChange(item.id, 'price', Number(e.target.value))} className='inputAlterar w-20'></input>
                                {/* <div onClick={() => excluir(item.id)}> */}
                                <div>
                                    <img src={lataLixo} alt="Lata de lixo" className='w-12 cursor-pointer'/>
                                </div>
                            </div>
                        </li>
                    )}
                </>}
                <div className="flex justify-center">
                    <button><Botao>Alterar</Botao></button>
                </div>
            </form>
            <div className='grid gap-7 justify-center'>
                <div className='flex justify-center gap-5'>
                    <h2 className='text-2xl'>Adicionar categoria:</h2>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                </div>
                <button onClick={alterarAltera}>Novo Item de Menu</button>
                {altera && <CriarMenuItem closeModal={alterarAltera}/>}
            </div>
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
                            </li>
                        ))}
                        </ul>
                    </div>
                ))} */}
            </>
        </section>
    )
}
//{ fechado && <Exclusao/>} fica entre o form e o section
export default AlterarCardapio;