import Logo from "/images/logoBB.png"; 

interface Props {
    children: string
}

const Botao = ({ children }: Props) => {
    return (
        <div className="flex w-64 bg-seaBlue text-white items-center justify-between px-5 rounded-3xl">
            {children}
            <img src={Logo} alt="Logo BB" />
        </div>
    )
}

export default Botao;