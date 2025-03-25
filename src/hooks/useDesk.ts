import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { IApiResponse } from "../interface/IApiResponse";

const API_URL = 'http://localhost:8080';

const fetchDesk = async (): AxiosPromise<IApiResponse[]> => {
    const response = axios.get(API_URL + '/desk')
    return response;
}

export function useDesk() {
    const query = useQuery({
        queryFn: fetchDesk,
        queryKey: ['desk'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}