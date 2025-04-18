import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IListOrders } from "../interface/IOrder";

const API_URL = 'http://localhost:8080';

const fetchOrder = async (): AxiosPromise<IListOrders[]> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/order', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

export function useOrder() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: fetchOrder,
        queryKey: ['order'],
        retry: 2
    })

    return {
        ...query,
        listOrder: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['order'] })
    }
}