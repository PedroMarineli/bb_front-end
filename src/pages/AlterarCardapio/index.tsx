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
                    <div key={categoria} className='grid gap-7 break-before'>
                        <h2 className='text-2xl'>{categoria}</h2>
                        <ul className='grid gap-7'>
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
        </section>
    )
}

export default AlterarCardapio;
