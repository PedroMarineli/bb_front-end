import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetReports } from "../interface/IReport";

const API_URL = 'http://localhost:8080';

const fetchReport = async (): AxiosPromise<IGetReports> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/reports', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

export function useReport() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: fetchReport,
        queryKey: ['report'],
        retry: 2
    })

    return {
        ...query,
        listReport: query.data?.data, // Garante que sempre retorna um array
        pagination: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['report'] })
    }
}