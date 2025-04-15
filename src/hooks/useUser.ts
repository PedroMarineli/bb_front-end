import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IListUsers } from "../interface/IUsers";

const API_URL = 'http://localhost:8080';

const fetchUsers = async (): AxiosPromise<IListUsers> => {
    const response = await axios.get(API_URL + '/user')
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