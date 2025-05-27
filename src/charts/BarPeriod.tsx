import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { useReportByPeriod } from "../hooks/useReportByPeriod";
import { format } from "date-fns";

interface BarChartProps {
  startDate: Date;
  endDate: Date;
}

export default function Bar({ startDate, endDate }: BarChartProps) {
  // Formata as datas para o formato esperado pela API
  const formattedStart = format(startDate, "yyyy-MM-dd'T'00:00:00");
  const formattedEnd = format(endDate, "yyyy-MM-dd'T'23:59:59");

  const { listReportByPeriod, isLoading } = useReportByPeriod({
    startDate: formattedStart,
    endDate: formattedEnd
  });

  // Transforma os dados para o formato que o react-charts espera
  const data = React.useMemo(() => {
    if (!listReportByPeriod) return [];

    return [
      {
        label: "Itens Mais Pedidos",
        data: listReportByPeriod.mostOrderedItems.map(item => ({
          primary: item.name,
          secondary: item.quantity,
        })),
      },
    ];
  }, [listReportByPeriod]);

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
                }),
                tooltip: {
                    style: {
                        color: "#000000",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        border: "1px solid #e5e7eb",
                    }
                }
            }}
        />
    )
}