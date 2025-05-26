import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { IGetMenuItens } from "../interface/IMenu";

const API_URL = 'http://localhost:8080';

const fetchMenuItem = async (id: any): AxiosPromise<IGetMenuItens> => {
    const response = await axios.get(API_URL + `/menu/${id}`)
    return response;
}

export function useMenuItem() {
    const query = useQuery({
        queryFn: () => fetchMenuItem(1),
        staleTime: 1000 * 60 * 5,
        queryKey: ['menuItem'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}