import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeskId, IDeskNumber } from "../interface/IDesk";

const API_URL = 'http://localhost:8080';

const postData = async (data: IDeskNumber): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/desk', data)
    return response;
}

const putData = async (data: IDeskId): AxiosPromise<any> => {
    const response = axios.put(API_URL + '/desk', data)
    return response
}

export function useDeskMutate() {
    const queryClient = useQueryClient();

    const postMutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['desk']})
        }
    })

    const putMutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['desk']})
        }
    })

    return { postMutate, putMutate };
}