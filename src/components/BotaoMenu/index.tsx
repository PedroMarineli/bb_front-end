import MenuHamburguer from "/icons/hamburguer.png";

const BotaoMenu = () => {
    return (
        <div className="flex flex-col fixed bottom-40 right-5 z-40 p-5 bg-white rounded-full border-solid border-2 border-black">
            <img src={MenuHamburguer} alt="Menu hamburguer" className="w-14 h-14"/>
        </div>
    )
}

export default BotaoMenu;