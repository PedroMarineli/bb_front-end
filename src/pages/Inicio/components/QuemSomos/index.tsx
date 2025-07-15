import HomemCozinhando from "../../../../../public/images/imagemHomemcozinhando.png";

const QuemSomos = () => {
    return (
        <section className="grid justify-items-center gap-14" id="sobreNos">
            <h2 className="titulosMain">Quem Somos</h2>
            <div className="grid gap-20 justify-items-center xl:flex items-center">
                <img src={HomemCozinhando} alt="Homem cozinhando" />
                <div className="grid gap-10">
                    <div>
                        <h4 className="text-2xl">Nossa História:</h4>
                        <p>O Burger Boss nasceu da paixão por hambúrgueres suculentos e ingredientes frescos. Tudo começou quando nosso fundador, Bob, decidiu transformar sua receita secreta de hambúrguer em um negócio. Com muito amor pela gastronomia e uma pitada de ousadia, a Burger Boss ganhou vida.</p>
                    </div>
                    <div>
                        <h4 className="text-2xl">Nossa Missão:</h4>
                        <p>Nosso objetivo é simples, unir as pessoas em torno de uma mesa deliciosa. Acreditamos que um bom hambúrguer pode fazer isso acontecer. Queremos ser o lugar onde amigos se encontram, famílias celebram e amantes de comida se deliciam.</p>
                    </div>    
                </div>
            </div>
        </section>
    )
}

export default QuemSomos;