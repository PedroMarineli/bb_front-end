import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateOrder, ICreateOrderItem, IListOrders } from "../interface/IOrder";

const API_URL = 'http://localhost:8080';

const postOrder = async (data: ICreateOrder): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(API_URL + '/order', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

const postOrderItem = async (data: ICreateOrderItem[]): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(API_URL + '/order/item', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

const putData = async (data: IListOrders): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.put(API_URL + '/desk', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

export function useOrderMutate() {
    const queryClient = useQueryClient();

    const postOrderMutate = useMutation({
        mutationFn: postOrder,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order']})
        }
    })

    const postOrderItemMutate = useMutation({
        mutationFn: postOrderItem,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order-item']})
        }
    })

    const putOrderMutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order']})
        }
    })

    return { postOrderMutate, postOrderItemMutate, putOrderMutate };
}