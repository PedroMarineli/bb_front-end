import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardapio from '../../mocks/cardapio.json';
import Botao from "../../components/Botao";
import PedidoEnviado from "../../components/PedidoEnviado";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../state/atom";
import { useMenuItem } from "../../hooks/useMenuItem";
import { useDesk } from "../../hooks/useDesk";
import { ICreateOrder } from "../../interface/IOrder";

const CadastroDePedidos = () => {
    const { data, isLoading } = useMenuItem()
    const { mesas } = useDesk();
    const [totalValue, setTotalValue] = useState(0)
    const [mesasDisponiveisIds, setMesasDisponiveisIds] = useState<number[]>([])
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<ICreateOrder["paymentMethod"]>("CASH")
    const [orderStatus, setOrderStatus] = useState<ICreateOrder["orderStatus"]>("CREATED")
    const [lista, setLista] = useState(cardapio);
    const aberto = useSetRecoilState(menuState)
    const [isLoadingMesas, setIsLoadingMesas] = useState(true);
    const [errorMesas, setErrorMesas] = useState<string | null>(null);
    const alterarStatus = () => {
        aberto(true)
    }
    const fechado = useRecoilValue(menuState)

    // const submitOrder = () => {
    //     const createOrder: ICreateOrder = {
    //         totalValue,
    //         paymentMethod, 
    //         orderStatus,
    //         desk: { id: id }
    //     }
    //     postMutate.mutate(createOrder)
    // }

    useEffect(() => {
    const fetchMesasDisponiveis = async () => {
        setIsLoadingMesas(true);
        setErrorMesas(null);
        try {
            if (mesas?.content) {
                // Filtra apenas os IDs das mesas não preenchidas (se necessário)
                const ids = mesas?.content
                .filter(mesa => mesa.filled === false || mesa.filled === undefined) // Mantém não preenchidas ou com 'filled' indefinido
                .map(mesa => mesa.id)
                .filter((id): id is number => id !== undefined) // Garante que não há undefined
                .sort((a, b) => a - b); // Ordena os IDs

                setMesasDisponiveisIds(ids);
                if (ids.length > 0 && mesaSelecionada === null) {
                setMesaSelecionada(ids[0]);
                }
            } else {
                setErrorMesas('Erro ao buscar mesas disponíveis.');
            }
        } catch (error: any) {
            setErrorMesas('Erro ao buscar mesas: ' + error.message);
        } finally {
            setIsLoadingMesas(false);
        }
    };
    fetchMesasDisponiveis();
    }, [mesaSelecionada]); // Refetch pode ser necessário em algum cenário, adicione dependências conforme necessário

    const [quantidades, setQuantidades] = useState<{ [itemId: number]: number }>({});

    const handleIncrement = (itemId: any) => {
      setQuantidades((prevQuantidades) => ({
        ...prevQuantidades,
        [itemId]: (prevQuantidades[itemId] || 0) + 1,
      }));
    };
  
    const handleDecrement = (itemId: any) => {
      setQuantidades((prevQuantidades) => ({
        ...prevQuantidades,
        [itemId]: Math.max(0, (prevQuantidades[itemId] || 0) - 1), // Garante que não seja negativo
      }));
    };

    const avancarMesa = () => {
        if (mesaSelecionada !== null && mesasDisponiveisIds.length > 0) {
          const currentIndex = mesasDisponiveisIds.indexOf(mesaSelecionada);
          if (currentIndex < mesasDisponiveisIds.length - 1) {
            setMesaSelecionada(mesasDisponiveisIds[currentIndex + 1]);
          }
        }
      };
    
      const retrocederMesa = () => {
        if (mesaSelecionada !== null && mesasDisponiveisIds.length > 0) {
          const currentIndex = mesasDisponiveisIds.indexOf(mesaSelecionada);
          if (currentIndex > 0) {
            setMesaSelecionada(mesasDisponiveisIds[currentIndex - 1]);
          }
        }
      };

    return (
        <div>
            <section className="telaBranca">
                <div className="flex justify-center">
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={retrocederMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[0]}>-</button>
                    <span>Mesa: {mesaSelecionada !== null ? mesaSelecionada : 'Selecione'}</span>
                    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={avancarMesa} disabled={mesaSelecionada === null || mesaSelecionada === mesasDisponiveisIds[mesasDisponiveisIds.length - 1]}>+</button>
                </div>
                {isLoading ? <p>Carregando...</p> : <>
                    {data?.items?.map((item) => 
                        <div className='flex items-center gap-8' key={item.id}>
                            <div className="flex">
                                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => handleDecrement(item.id)}>-</button>
                                <input type="text" className="bg-transparent w-12 text-center" value={quantidades[item.id] || 0}/>
                                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                            <p>{item.name}: {item.category}</p>
                        </div>
                    )}
                </>}
                <div className='grid gap-7'>
                    <h2 className='text-2xl text-center pt-7'>Observações:</h2>
                    <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"/>
                    <div className="flex justify-center" onClick={alterarStatus}>
                        <Botao>Enviar para a cozinha</Botao>
                    </div>
                </div>
            </section>
            <button className="pt-5 text-right">
                <Link to='/bb-alterar-cardapio'>Alterar Cardápio</Link>
            </button>
            { fechado && <PedidoEnviado/>}
        </div>
    )
}

export default CadastroDePedidos;

{/* <section className="telaBranca">
<div className="flex justify-center">
    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">-</button>
    <input type="text" className="bg-transparent w-36 text-center text-2xl" value="Mesa 10"/>
    <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
</div>
{lista.map(categoria => (
    <div className='grid gap-5'>
        <h2 className='text-2xl text-center pt-7'>{categoria.nome}:</h2>
        <ul className='grid gap-3'>
        {categoria.itens.map((item) => (
            <li key={item.nome}>
                <div className='flex items-center gap-8'>
                    <div className="flex">
                        <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">-</button>
                        <input type="text" className="bg-transparent w-12 text-center" value="0"/>
                        <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black">+</button>
                    </div>
                    <p>{item.nome}: {item.descricao}</p>
                </div>
            </li>
        ))}
        </ul>
    </div>
))}
<div className='grid gap-7'>
    <h2 className='text-2xl text-center pt-7'>Observações:</h2>
    <input type="text" className="p-5 bg-transparent w-full h-36 border-solid border-2 rounded-lg border-black"/>
    <div className="flex justify-center" onClick={alterarStatus}>
        <Botao>Enviar para a cozinha</Botao>
    </div>
</div>
</section> */}