import Logo from "../../../public/images/logoBB.png"; 

interface Props {
    children: string
}

const Botao = ({ children }: Props) => {
    return (
<<<<<<< HEAD
        <div className="flex gap-3 bg-seaBlue text-white items-center justify-between px-5 rounded-3xl">
            {children}
            <img src={Logo} alt="Logo BB" className="w-16"/>
=======
        <div className="cursor-pointer flex gap-2 w-auto bg-seaBlue active:bg-seaBlueLighter text-white items-center justify-between px-5 rounded-3xl text-center">
            {children}
            <div className="w-16 h-16">
                <img src={Logo} alt="Logo BB"/>
            </div>
>>>>>>> origin/main
        </div>
    )
}

export default Botao;