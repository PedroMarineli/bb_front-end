<<<<<<< HEAD
import Bar from "../../charts/Bar"
import { useEffect, useState } from "react"
import { usePDF } from "react-to-pdf"
import { format } from "date-fns";
import { useReportByPeriod } from "../../hooks/useReportByPeriod";

const PratosMaisPedidos = () => {
    const [formStartDate, setFormStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [formEndDate, setFormEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [isFiltering, setIsFiltering] = useState(false)
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'})
    const [showPdfContent, setShowPdfContent] = useState(false)
    
    // Estados para as datas usadas na query (só atualizados ao filtrar)
    const [queryDates, setQueryDates] = useState({
        startDate: `${format(new Date(), 'yyyy-MM-dd')}T00:00:00`,
        endDate: `${format(new Date(), 'yyyy-MM-dd')}T23:59:59`
    })

    const { listReportByPeriod, isLoading } = useReportByPeriod({ 
        startDate: queryDates.startDate,
        endDate: queryDates.endDate
    })

    const handleDateChange = () => {
        setIsFiltering(true)
        // Atualiza as datas da query apenas quando clicar no botão
        setQueryDates({
            startDate: `${formStartDate}T00:00:00`,
            endDate: `${formEndDate}T23:59:59`
        })
    }

    useEffect(() => {
        if (!isLoading) {
            setIsFiltering(false)
        }
    }, [isLoading])

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
                    <label htmlFor="startDate" className="mb-1 font-medium">Data Inicial</label>
                    <input type="date" id="startDate" value={formStartDate} onChange={(e) => setFormStartDate(e.target.value)} className="p-2 border rounded" max={formEndDate}/>
                </div>                
                <div className="flex flex-col">
                    <label htmlFor="endDate" className="mb-1 font-medium">Data Final</label>
                    <input type="date" id="endDate" value={formEndDate} onChange={(e) => setFormEndDate(e.target.value)} className="p-2 border rounded" min={formStartDate}/>
                </div>
                <button onClick={handleDateChange} className="mt-6 sm:mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Filtrar</button>
            </div>

            <h2 className="text-xl font-bold">Itens Mais Pedidos</h2>
            {(isLoading || isFiltering) ? (
                <p>Carregando...</p>
            ) : (
                <div className="h-96">
                    {listReportByPeriod?.mostOrderedItems?.length ? (
                        <div className="grid gap-5">
                            <div className="h-96">
                                <Bar data={listReportByPeriod.mostOrderedItems}/>
                            </div>
                            <p>Valor total em vendas: R${listReportByPeriod?.totalRevenue}</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p>Nenhum dado disponível para o período selecionado</p>
                        </div>
                    )}
                </div>
            )}
            {listReportByPeriod?.mostOrderedItems?.length ? (
                <button className="mt-10" onClick={handleGeneratePdf}>Download PDF</button>
            ) : null}
            
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
                            {listReportByPeriod?.mostOrderedItems?.map(report => (
                                <tr key={report.id}>
                                    <td>{report.name}</td>
                                    <td>{report.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Valor total em vendas: R${listReportByPeriod?.totalRevenue}</p>
                </div>
            )}
            {/* <h2>Pratos mais pedidos (últimos 30 dias)</h2> */}
        </div>
    )
}

export default PratosMaisPedidos
=======
const PratosMaisPedidos = () => {
    return(
        <div className="text-center">
            <h2>Pratos mais pedidos (últimos 30 dias)</h2>
        </div>
    )
}
export default PratosMaisPedidos;
>>>>>>> origin/main
