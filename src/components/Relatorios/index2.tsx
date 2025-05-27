import { useState } from "react"
import { usePDF } from "react-to-pdf"
import Bar from "../../charts/Bar"
import { format } from "date-fns";
import { useReportByPeriod } from "../../hooks/useReportByPeriod";

const PratosMaisPedidos = () => {
    const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const { listReportByPeriod, isLoading, refetch } = useReportByPeriod({ 
        startDate: `${startDate}T00:00:00`,
        endDate: `${endDate}T23:59:59`
    })
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'})
    const [showPdfContent, setShowPdfContent] = useState(false)

    const handleDateChange = () => {
        refetch()
    }

    const handleGeneratePdf = () => {
        setShowPdfContent(true)
        setTimeout(() => {
            toPDF()
            setShowPdfContent(false)
        }, 10)
    }

    return(
        <div className="grid gap-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="startDate" className="mb-1 font-medium">
                        Data Inicial
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 border rounded"
                        max={endDate}
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="endDate" className="mb-1 font-medium">
                        Data Final
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 border rounded"
                        min={startDate}
                    />
                </div>
                
                <button
                    onClick={handleDateChange}
                    className="mt-6 sm:mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Filtrar
                </button>
            </div>

            <h2 className="text-xl font-bold">Itens Mais Pedidos</h2>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="h-96">
                    <Bar />
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
                            {listReportByPeriod?.mostOrderedItems.map(report => (
                                <tr key={report.id}>
                                    <td>{report.name}</td>
                                    <td>{report.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>{listReportByPeriod?.totalRevenue}</p>
                </div>
            )}
            {/* <h2>Pratos mais pedidos (últimos 30 dias)</h2> */}
        </div>
    )
}

export default PratosMaisPedidos
