import MenuHamburguer from "/icons/hamburguer.png";

const BotaoMenu = () => {
    return (
        <div className="flex flex-col fixed bottom-40 right-20 z-40 p-5 bg-white rounded-full">
            <img src={MenuHamburguer} alt="Menu hamburguer" className="w-14 h-14"/>
        </div>
    )
}

export default BotaoMenu;