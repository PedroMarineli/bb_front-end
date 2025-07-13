<<<<<<< HEAD
import HeaderInicio from "./components/HeaderInicio";
import Footer from "./components/Footer";
import QuemSomos from "./components/QuemSomos";
import Unidades from "./components/Unidades";
import Cardapio from "./components/Cardapio";
import FaleComAGente from "./components/FaleComAGente";
import LoginSistema from "../../components/LoginSistema";
import { useRecoilValue } from "recoil";
import { menuState } from "../../state/atom";
import { useState } from "react";

const Inicio = () => {
    const aberto = useRecoilValue(menuState)
=======
import HeaderInicio from "./components/HeaderInicio"
import Footer from "./components/Footer"
import QuemSomos from "./components/QuemSomos"
import Unidades from "./components/Unidades"
import Cardapio from "./components/Cardapio"
import FaleComAGente from "../../components/FaleComAGente"
import LoginSistema from "../../components/LoginSistema"
import { useRecoilValue } from "recoil"
import { menuState } from "../../state/atom"
import { useState } from "react"
const Inicio = () => {
    const aberto = useRecoilValue(menuState)

>>>>>>> origin/main
    const [fale, setFale] = useState(false)
    const alterarStatus = () => {
        setFale(!fale)
    }

    return (
        <main className="overflow-visible min-w-full">
            <HeaderInicio/>
            <div className="bg-hamburguer bg-no-repeat bg-right-top">
                <main className="mx-32 lg:mx-60 my-32 grid gap-32" id="home">
                    <div className="w-1/2 min-h-[calc(70vh)] flex flex-col justify-center">
                        <h2 className="font-bb text-8xl pb-6">Burguer Boss</h2>
                        <p className="text-2xl pb-5">Porque fome não combina com rei.</p>
                        <p className="text-2xl">Venha experimentar essa maravilha que se chama Burguer Boss!</p>
                    </div>
                    <Cardapio />
                    <Unidades />
                    <QuemSomos />
                </main>
            </div>
            <Footer alterarStatus={alterarStatus}/>
<<<<<<< HEAD
            {aberto && <LoginSistema chamarFale={alterarStatus}/>}
=======
            {aberto && <LoginSistema/>}
>>>>>>> origin/main
            {fale && <FaleComAGente alterarStatus={alterarStatus}/>}
        </main>
    )
}

export default Inicio
