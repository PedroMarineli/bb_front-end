import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menuState } from '../../state/atom';
import Exclusao from '../../components/Exclusao';
import CriarMenuItem from '../../components/CriarMenuItem';
import { useMenuItem } from '../../hooks/useMenuItem';
import { IMenuItem } from '../../interface/IMenu';
import AlterarMenuItem from './AlterarMenuItem';

const AlterarCardapio = () => {
    const { data, isLoading } = useMenuItem()
    const [altera, setAltera] = useState(false)
    const [items, setItems] = useState<IMenuItem[]>([])
    const alterarAltera = () => {
        setAltera(!altera)
    }
    
    useEffect(() => {
        if (data?.items) {
            setItems(data.items); 
        }
    }, [data?.items])
    
    console.log(items)

    return (
        <section className="telaBranca grid gap-10">
            {/* <form onSubmit={alterarCardapio} className='grid gap-7'> */}
            {isLoading ? <p>Carregando...</p> : <>
                {items.map((item) => 
                    <AlterarMenuItem key={item.id} {...item}/>
                )}
            </>}
            <div className='grid gap-7 justify-center'>
                <div className='flex justify-center gap-5'>
                    <h2 className='text-2xl'>Adicionar categoria:</h2>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                </div>
                <button onClick={alterarAltera}>Novo Item de Menu</button>
                {altera && <CriarMenuItem closeModal={alterarAltera}/>}
            </div>
        </section>
    )
}
//{ fechado && <Exclusao/>} fica entre o form e o section
export default AlterarCardapio;

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