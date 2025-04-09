import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeskId } from "../interface/IDesk";
import { ICreateOrder, ICreateOrderItem } from "../interface/IOrder";

const API_URL = 'http://localhost:8080';

const postOrder = async (data: ICreateOrder): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/order', data)
    return response;
}

const postOrderItem = async (data: ICreateOrderItem[]): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/order/item', data)
    return response;
}

const putData = async (data: IDeskId): AxiosPromise<any> => {
    const response = axios.put(API_URL + '/desk', data)
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

    const putMutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['order']})
        }
    })

    return { postOrderMutate, postOrderItemMutate, putMutate };
}