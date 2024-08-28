import HeaderInicio from "../Inicio/components/HeaderInicio";

const InicioSistema = () => {
    return(
        <main className="h-dvh bg-hamburguer bg-no-repeat bg-right-top">
            <HeaderInicio />
            <div className="pt-28 pb-32 w-1/2 m-32">
                <h2 className="font-bb text-8xl pb-6">Burguer Boss</h2>
                <p className="text-2xl">Porque fome não combina com rei.</p>
            </div>
        </main>
    )
}
export default InicioSistema;