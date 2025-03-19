import Logo from "/images/logoBB.png"; 

interface Props {
    children: string
}

const Botao = ({ children }: Props) => {
    return (
        <div className="cursor-pointer flex gap-2 w-auto bg-seaBlue active:bg-seaBlueLighter text-white items-center justify-between px-5 rounded-3xl text-center">
            {children}
            <div className="w-16 h-16">
                <img src={Logo} alt="Logo BB"/>
            </div>
        </div>
    )
}

export default Botao;