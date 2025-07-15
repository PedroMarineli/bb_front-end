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
    
    const url = `${API_URL}/reports/period`
    
    const response = await axios.get(url, {
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

export function useReportByPeriod(params?: ReportPeriodParams) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: () => params ? fetchReportByPeriod(params) : Promise.resolve(null),
        queryKey: ['report', params?.startDate, params?.endDate],
        retry: 2,
        enabled: !!params?.startDate && !!params?.endDate, // Só executa quando ambas datas estiverem definidas
        staleTime: 0, // Adicione isso para evitar cache
    })

    return {
        ...query,
        listReportByPeriod: query.data?.data || null,
        pagination: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['report', params?.startDate, params?.endDate] })
    }
}