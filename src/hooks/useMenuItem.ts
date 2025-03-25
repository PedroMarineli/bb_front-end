import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { IMenu } from "../interface/IMenu";

const API_URL = 'http://localhost:8080';

const fetchMenuItem = async (id: any): AxiosPromise<IMenu[]> => {
    const response = await axios.get(API_URL + `/menu/${id}`)
    return response;
}

export function useMenuItem() {
    const query = useQuery({
        queryFn: () => fetchMenuItem(4),
        queryKey: ['menuItem'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}