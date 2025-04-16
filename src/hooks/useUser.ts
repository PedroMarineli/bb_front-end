import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IListUsers } from "../interface/IUsers";

const API_URL = 'http://localhost:8080';

export const axiosInstance = axios.create({
    baseURL: API_URL
})

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('tokenJWT');
//     console.log(token)
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// },
// (error) => Promise.reject(error)
// )

const fetchUsers = async (): AxiosPromise<IListUsers> => {
    const response = await axiosInstance.get('/user').then(res => res.data)
    return response;
}

export function useUsers() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: fetchUsers,
        queryKey: ['users'],
        retry: 2
    })

    return {
        ...query,
        users: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['users'] })
    }
}