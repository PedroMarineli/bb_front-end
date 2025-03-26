import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeskNumber } from "../interface/IDeskNumber";

const API_URL = 'http://localhost:8080';

const postData = async (data: IDeskNumber): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/desk', data)
    return response;
}

export function useDeskMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['desk']})
        }
    })

    return mutate;
}