import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetReports } from "../interface/IReport";

const API_URL = 'http://localhost:8080';

interface ReportPeriodParams {
  startDate: string;
  endDate: string;
}

const fetchReportByPeriod = async (params: ReportPeriodParams): AxiosPromise<IGetReports> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/reports', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        params: {
            startDate: params.startDate,
            endDate: params.endDate
        }
    })
    return response
}

export function useReportByPeriod(params: ReportPeriodParams) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: () => fetchReportByPeriod(params),
        queryKey: ['report', params.startDate, params.endDate],
        retry: 2,
        enabled: !!params.startDate && !!params.endDate // Só executa quando ambas datas estiverem definidas
    })

    return {
        ...query,
        listReportByPeriod: query.data?.data || [], // Garante que sempre retorna um array
        pagination: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['report', params.startDate, params.endDate] })
    }
}