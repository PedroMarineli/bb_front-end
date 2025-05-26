import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IOrderResponse } from "../interface/IOrder";

const API_URL = 'http://localhost:8080';

const fetchOrder = async (): AxiosPromise<IOrderResponse> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/order', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

export function useOrder() {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryFn: fetchOrder,
        queryKey: ['order'],
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,  // 5 minutos
        retry: 2
    })

    return {
        ...query,
        listOrder: query.data?.data?.content || [], // Garante que sempre retorna um array
        pagination: query.data?.data?.page,
        refetch: () => queryClient.refetchQueries({ queryKey: ['order'] })
    }
}