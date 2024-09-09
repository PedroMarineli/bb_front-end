import Logo from "/images/logoBB.png";

const BurguerBoss = () => {
    return (
        <div className="flex items-center">
            <img src={Logo} alt="logoBB"/>
            <span className="font-bb text-4xl">Burguer Boss</span>
        </div>
    )
}

export default BurguerBoss;