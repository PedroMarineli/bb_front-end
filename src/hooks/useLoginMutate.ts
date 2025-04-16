import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDoLogin } from "../interface/ILogin";

const API_URL = 'http://localhost:8080';

// export const axiosInstance = axios.create({
//     baseURL: API_URL
// })

 const postLogin = async (data: IDoLogin): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/login', data)
    return response;
}

export function useLoginMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postLogin,
        retry: 2,
        onSuccess: () => {
            // if (data.data && data.data.token) {
            //     const token = localStorage.setItem('tokenJWT', data.data.token); // Armazene o token no localStorage
            //     console.log(token)
            // } else {
            //     console.log("token nao encontrado")
            // }
            queryClient.invalidateQueries({queryKey: ['login']})
            
        },
        onError: (error) => {
            console.error("Erro na mutação de login:", error);
            // Lógica para lidar com erros na mutação
        }
    })

    return mutate
}