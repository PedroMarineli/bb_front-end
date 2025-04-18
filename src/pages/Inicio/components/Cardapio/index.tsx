import { useEffect, useState } from 'react';
import { IMenuItem } from '../../../../interface/IMenu';
import { useMenuItem } from '../../../../hooks/useMenuItem';
import Lanche from '../../../../../public/icons/lanche.png';

const Cardapio = () => {
    const { data, isLoading } = useMenuItem()
    const [items, setItems] = useState<IMenuItem[]>([])
    const categorias: { [categoria: string]: IMenuItem[] } = {}
    
    useEffect(() => {
        if (data?.items) {
            setItems(data.items); 
        }
    }, [data?.items])

    items.forEach(item => {
        if (!categorias[item.category]) {
            categorias[item.category] = [];
        }
        categorias[item.category].push(item);
    });

    return (
        <section className="telaBranca text-center grid gap-14" id='cardapio'>
            <h2 className="titulosMain">Cardápio</h2>
            <div>
                <p className="text-2xl mb-14">Descubra nossos pratos clássicos, preparados com carinho e ingredientes frescos. Deixe-se surpreender pela simplicidade e sabor que só a cozinha tradicional pode oferecer.</p>
                <div className="grid sm: xl:grid-cols-2 gap-14">
                    {isLoading ? <p>Carregando...</p> : <>
                        {Object.keys(categorias).map(categoria => (
                            <div key={categoria} className='grid gap-7 break-before'>
                                <h2 className='text-2xl'>{categoria}</h2>
                                <ul className='grid gap-7'>
                                    {categorias[categoria].map(item => (
                                        <li key={item.id}>
                                            <div className='flex'>
                                                <p>{item.name}: {item.category} - R${item.price?.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>}
                </div>
                <div className='flex items-center gap-3 justify-center mt-14'>
                    <p>Aproveite!</p>
                    <img src={Lanche} alt="Lanche" className='w-10 h-10'/>
                </div>
            </div>
        </section>
    )
}

export default Cardapio;