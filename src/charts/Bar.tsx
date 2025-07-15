import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { useReport } from "../hooks/useReport";

export default function Bar() {
    const { listReport, isLoading } = useReport()

    // Transforma os dados para o formato que o react-charts espera
    const data = React.useMemo(() => {
        if (!listReport) return []
        
        return [
            {
                label: "Itens Mais Pedidos",
                data: listReport.mostOrderedItems.map(item => ({
                    primary: item.name,
                    secondary: item.quantity,
                }))
            },
        ]
    }, [listReport])

    const primaryAxis = React.useMemo<AxisOptions<{ primary: string; secondary: number }>>(
        () => ({
            getValue: (datum) => datum.primary,
            scaleType: 'band',
        }),
        []
    )

    const secondaryAxes = React.useMemo<AxisOptions<{ primary: string; secondary: number }>[]>(
        () => [
            {
                getValue: (datum) => datum.secondary,
                elementType: 'bar',
            },
        ],
        []
    )

    if (isLoading) return <div>Carregando...</div>
    if (!data.length) return <div>Nenhum dado disponível</div>

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
                defaultColors: ["#000000"],
                getSeriesStyle: () => ({
                    color: "#0000FF", 
                })
            }}
        />
    )
}