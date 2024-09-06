import HeaderInicio from "./components/HeaderInicio"
import Footer from "./components/Footer"
import QuemSomos from "./components/QuemSomos"
import Unidades from "./components/Unidades"
import Cardapio from "./components/Cardapio"
import FaleComAGente from "../../components/FaleComAGente"
import LoginSistema from "../../components/LoginSistema"
import { useRecoilValue } from "recoil"
import { menuState } from "../../state/atom"

const Inicio = () => {
    const aberto = useRecoilValue(menuState)
    //const { overlayAberto } = useAbertoFechado()

    return (
        <div className="overflow-visible">
            <HeaderInicio />
            <div className="bg-hamburguer bg-no-repeat bg-right-top">
                <main className="m-32 grid gap-32">
                    <div className="w-1/2 min-h-[calc(70vh)] flex flex-col justify-center">
                        <h2 className="font-bb text-8xl pb-6">Burguer Boss</h2>
                        <p>Porque fome não combina com rei.</p>
                        <p>Venha experimentar essa maravilha que se chama Burguer Boss!</p>
                    </div>
                    <Cardapio />
                    <Unidades />
                    <QuemSomos />
                </main>
                <Footer />
                {/* <LoginSistema/> */}
                { aberto && <FaleComAGente />}
            </div>
        </div>
    )
}

export default Inicio