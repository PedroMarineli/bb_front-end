import axios, { AxiosError, AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMenuItem, IPostMenuItem } from "../interface/IMenu";

const API_URL = 'http://localhost:8080';

const postMenuItem = async (data: IPostMenuItem): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(API_URL + '/menu/item', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

const putMenuItem = async (data: IMenuItem): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.put(API_URL + '/menu/item', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

const deleteMenuItem = async (id: IMenuItem): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.delete(API_URL + `/menu/item/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
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
        onError: (error: AxiosError) => {
            // Tratamento detalhado do erro
            if (error.response) {
                // Erro com resposta do servidor (4xx, 5xx)
                console.error("Erro na resposta do servidor:", {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            } else if (error.request) {
                // Erro sem resposta do servidor
                console.error("Sem resposta do servidor:", error.request);
            } else {
                // Erro na configuração da requisição
                console.error("Erro na configuração:", error.message);
            }
            console.error("Configuração da requisição falha:", error.config);
        }
    })

    return { postMutate, putMutate, deleteMutate };
}