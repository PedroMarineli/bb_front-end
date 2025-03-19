/* import axios, { AxiosPromise } from "axios";

const API_URL = 'http://api.fabio.com.br';

const fetchTable = async (): AxiosPromise<TableData> => {
    const response = axios.get(API_URL + '/tables')
    return response;
}

export function useTable() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['table'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
} */