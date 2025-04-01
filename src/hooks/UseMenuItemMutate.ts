import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMenuItem } from "../interface/IMenu";

const API_URL = 'http://localhost:8080';

const postMenuItem = async (data: IMenuItem): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu/item', data)
    return response;
}

const putMenuItem = async (data: IMenuItem): AxiosPromise<any> => {
    const response = axios.put(API_URL + '/menu/item', data)
    return response
}

const deleteMenuItem = async (id: IMenuItem): AxiosPromise<any> => {
    const response = axios.delete(API_URL + `/menu/item/${id}`)
    return response
}

export function useMenuItemMutate() {
    const queryClient = useQueryClient();

    const postMutate = useMutation({
        mutationFn: postMenuItem,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menuItem']})
        }
    })

    const putMutate = useMutation({
        mutationFn: putMenuItem,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menuItem']})
        }
    })

    const deleteMutate = useMutation({
        mutationFn: deleteMenuItem,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menuItem']})
        },
        onError: () => {
            console.log("ERROR")
        }

    })

    return { postMutate, putMutate, deleteMutate };
}