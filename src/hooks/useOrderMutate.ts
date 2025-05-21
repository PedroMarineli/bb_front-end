import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateOrder, IPostOrderItem, IGetOrder } from "../interface/IOrder";

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

const postOrderItem = async (data: IPostOrderItem): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(API_URL + '/order/item', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

const postOrderCompleted = async (id: number): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(
        API_URL + `/order/${id}/finish`,
        null, // <--- Sem corpo de requisição, ou pode ser {} se o backend espera um JSON vazio
        { // <--- Este é o objeto de configuração, onde os headers devem ir
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    return response
}

const putOrder = async (data: IGetOrder): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.put(API_URL + '/order', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

const deleteOrder = async (id: number): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.delete(API_URL + `/order/${id}`, {
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

    const postOrderFinished = useMutation({
        mutationFn: postOrderCompleted,
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
        mutationFn: putOrder,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order']})
        }
    })

    const deleteMutate = useMutation({
        mutationFn: deleteOrder,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order']})
        },
        onError: () => {
            console.log("ERROR")
        }
    })

    return { postOrderMutate, postOrderFinished, postOrderItemMutate, putOrderMutate, deleteMutate }
}