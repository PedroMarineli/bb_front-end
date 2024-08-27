import HomemCozinhando from "/images/imagemHomemcozinhando.png";

const QuemSomos = () => {
    return (
        <section className="grid justify-items-center">
            <h2 className="titulosMain">Quem Somos</h2>
            <div className="flex items-center gap-10">
                <img src={HomemCozinhando} alt="Homem cozinhando" />
                <div>
                    <h4 className="text-2xl">Nossa História:</h4>
                    <p>A Burger Boss nasceu da paixão por hambúrgueres suculentos e ingredientes frescos. Tudo começou quando nosso fundador, Bob, decidiu transformar sua receita secreta de hambúrguer em um negócio. Com muito amor pela gastronomia e uma pitada de ousadia, a Burger Boss ganhou vida.</p>
                    <h4 className="text-2xl pt-10">Nossa Missão:</h4>
                    <p>Nosso objetivo é simples, unir as pessoas em torno de uma mesa deliciosa. Acreditamos que um bom hambúrguer pode fazer isso acontecer. Queremos ser o lugar onde amigos se encontram, famílias celebram e amantes de comida se deliciam.</p>
                </div>
            </div>
        </section>
    )
}

export default QuemSomos;