import axios, { AxiosPromise } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IApiResponse } from "../interface/IDesk";

const API_URL = 'http://localhost:8080';

const fetchDesk = async (): AxiosPromise<IApiResponse> => {
    const response = await axios.get(API_URL + '/desk')
    return response;
}

export function useDesk() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: fetchDesk,
        queryKey: ['desks'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data,
        refetch: () => queryClient.refetchQueries({ queryKey: ['desks'] })
    }
}