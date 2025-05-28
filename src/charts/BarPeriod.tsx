import React from "react";
import { AxisOptions, Chart } from "react-charts";

interface MostOrderedItem {
    id: number;
    name: string;
    quantity: number;
}

interface BarProps {
    data?: MostOrderedItem[]
}

export default function Bar({ data = [] }: BarProps) {
    const chartData = React.useMemo(() => {
        if (!data || data.length === 0) return []

        return [
            {
                label: "Itens Mais Pedidos",
                data: data.map(item => ({
                    primary: item.name,
                    secondary: item.quantity,
                })),
            },
        ];
    }, [data]);

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

    if (!chartData.length) return <div>Nenhum dado disponível para o período selecionado</div>

    return (
        <Chart
            options={{
                data: chartData,
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