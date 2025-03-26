import axios, { AxiosPromise } from "axios"
import { IMenuItem } from '../interface/IMenuItem';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postMenuItem = async (data: IMenuItem): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu/4', data)
    return response;
}

export function useMenuItemMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postMenuItem,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menuItem']})
        }
    })

    return mutate;
}