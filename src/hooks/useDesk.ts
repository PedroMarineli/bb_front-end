import axios, { AxiosPromise } from "axios";
import { IMesa } from '../interface/IMesa';
import { useQuery } from "react-query";

const API_URL = 'http://localhost:8080';

const fetchDesk = async (): AxiosPromise<IMesa[]> => {
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