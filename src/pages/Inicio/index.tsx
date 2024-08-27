import HeaderInicio from "./components/HeaderInicio"
import Footer from "./components/Footer"
import QuemSomos from "./components/QuemSomos"
import Unidades from "./components/Unidades"
import Cardapio from "./components/Cardapio"

const Inicio = () => {
    return (
        <div className="bg-hamburguer bg-no-repeat bg-right-top overflow-visible">
            <HeaderInicio />
            <main className="m-32 grid gap-32">
                <div className="pt-28 pb-32 w-1/2">
                    <h2 className="font-bb text-8xl pb-6">Burguer Boss</h2>
                    <p className="text-2xl">Porque fome não combina com rei.</p>
                    <p className="text-2xl">Venha experimentar essa maravilha que se chama Burguer Boss!</p>
                </div>
                <Cardapio />
                <Unidades />
                <QuemSomos />
            </main>
            <Footer />
        </div>
    )
}

export default Inicio