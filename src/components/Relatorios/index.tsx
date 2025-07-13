<<<<<<< HEAD
import Bar from "../../charts/Bar";
import { useReport } from "../../hooks/useReport";
import { usePDF } from 'react-to-pdf';
import { useState } from "react";

const OcupacaoMesasPorDia = () => {
    const { listReport, isLoading } = useReport()
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'})
    const [showPdfContent, setShowPdfContent] = useState(false)

    const handleGeneratePdf = () => {
        setShowPdfContent(true)
        setTimeout(() => {
            toPDF()
            setShowPdfContent(false)
        }, 10)
    }

    return(
        <div className="grid gap-8 text-center">
            <h2 className="text-xl font-bold">Itens Mais Pedidos</h2>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grid gap-5">
                    <div className="h-96">
                        <Bar />
                    </div>
                    <p>Valor total em vendas: R${listReport?.totalRevenue}</p>
                </div>
            )}
            <button onClick={handleGeneratePdf}>Download PDF</button>
            {showPdfContent && (
                <div ref={targetRef}>
                    <table className="text-center w-full">
                        <thead>
                            <tr>
                                <th>Prato</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listReport?.mostOrderedItems?.map(report => (
                                <tr key={report.id}>
                                    <td>{report.name}</td>
                                    <td>{report.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Valor total em vendas: R${listReport?.totalRevenue}</p>
                </div>
            )}

            {/* <button onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef}>
                {isLoading ? <p>Carregando...</p> : <>
                        <table className="text-center w-full">
                            <thead>
                                <tr>
                                    <th>Prato</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listReport?.leastOrderedItems.map(report => (
                                    <tr key={report.id}>
                                        <td>{report.name}</td>
                                        <td>{report.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    <p>{listReport?.totalRevenue}</p>
                </>}
            </div> */}
            {/* <h2>Número de ocupações de mesas por dias da semana</h2> */}
        </div>
    )
}

export default OcupacaoMesasPorDia
=======
const OcupacaoMesasPorDia = () => {
    return(
        <div className="text-center">
            <h2>Número de ocupações de mesas por dias da semana</h2>
        </div>
    )
}
export default OcupacaoMesasPorDia;
>>>>>>> origin/main
