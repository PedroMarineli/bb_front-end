import axios, { AxiosPromise } from "axios"
import { IMesa } from '../interface/IMesa';
import { useMutation, useQueryClient } from "react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: IMesa): AxiosPromise<any> => {
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