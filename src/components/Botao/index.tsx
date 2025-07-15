import Logo from "../../../public/images/logoBB.png"; 

interface Props {
    children: string
}

const Botao = ({ children }: Props) => {
    return (
        <div className="flex gap-3 bg-seaBlue text-white items-center justify-between px-5 rounded-3xl">
            {children}
            <img src={Logo} alt="Logo BB" className="w-16"/>
        </div>
    )
}

export default Botao;