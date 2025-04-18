import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateUser, IUpdateUser } from "../interface/IUsers";

const API_URL = 'http://localhost:8080';

const postUsers = async (data: ICreateUser): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.post(API_URL + '/user', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response;
}

const putUsers = async (data: IUpdateUser): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.put(API_URL + '/user', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

const deleteUsers = async (id: IUpdateUser): AxiosPromise<any> => {
    const token = localStorage.getItem('token')
    const response = axios.delete(API_URL + `/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return response
}

export function useUserMutate() {
    const queryClient = useQueryClient();

    const postMutate = useMutation({
        mutationFn: postUsers,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })

    const putMutate = useMutation({
        mutationFn: putUsers,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })

    const deleteMutate = useMutation({
        mutationFn: deleteUsers,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        },
        onError: () => {
            console.log("ERROR")
        }
    })

    return { postMutate, putMutate, deleteMutate };
}