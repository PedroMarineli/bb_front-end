import { useReport } from "../../hooks/useReport";

const OcupacaoMesasPorDia = () => {
    const { listReport, isLoading } = useReport()

    return(
        <div className="text-center">
            {/* <h2>Número de ocupações de mesas por dias da semana</h2> */}
            {isLoading ? <p>Carregando...</p> : <>
                {listReport?.leastOrderedItems.map(report => (
                    <div key={report.id}>
                        <p>{report.name}</p>
                        <p>{report.quantity}</p>
                    </div>
                ))}
                {listReport?.mostOrderedItems.map(report => (
                    <div key={report.id}>
                        <p>{report.name}</p>
                        <p>{report.quantity}</p>
                    </div>
                ))}
                <p>{listReport?.totalRevenue}</p>
            </>}
        </div>
    )
}
export default OcupacaoMesasPorDia