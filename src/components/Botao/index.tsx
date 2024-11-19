import Logo from "/images/logoBB.png"; 

interface Props {
    children: string
}

const Botao = ({ children }: Props) => {
    return (
        <div className="flex w-64 bg-seaBlue text-white items-center justify-between px-5 rounded-3xl text-center">
            {children}
            <div className="w-18 h-18">
                <img src={Logo} alt="Logo BB"/>
            </div>
        </div>
    )
}

export default Botao;