import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDoLogin } from "../interface/ILogin";

const API_URL = 'http://localhost:8080';

export const axiosInstance = axios.create({
    baseURL: API_URL
})

const postLogin = async (data: IDoLogin): AxiosPromise<any> => {
    const response = axiosInstance.post('/login', data)
    return response;
}

export function useLoginMutate() {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: postLogin,
        retry: 2,
        onSuccess: (data) => {
            localStorage.setItem('tokenJWT', data.data.tokenJWT)
            queryClient.invalidateQueries({queryKey: ['login']})
        },
        onError: (error) => {
            console.error("Erro na mutação de login:", error)
        }
    })

    return mutate
}