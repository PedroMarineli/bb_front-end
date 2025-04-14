import axios, { AxiosError, AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDoLogin } from "../interface/ILogin";
import { parseCookies } from "nookies";
//import { signOut } from "shared/libs";

const API_URL = 'http://localhost:8080';

// let isRefreshing = false
// let failedRequestQueue: any = []

// export const getAxios = (token: string): any => {
//     return axios.create({
//         baseURL: API_URL + '/login',
//         headers: { Authorization: `Bearer ${token}` }
//     })
// }

// export function setupAPIClient(ctx = undefined) {
//     let cookies = parseCookies(ctx)
//     const api = getAxios(cookies["belezixadmin.token"])
//     api.interceptors.response.use((response: any) => response, (error: any) => {
//         if(error?.response?.status === 401) {
//             if(error?.response?.data?.error === "Unauthorized") {
//                 console.log("renova token")
//                 cookies = parseCookies(ctx)
//                 const { "belezixadmin.refreshToken": refreshToken } = cookies
//                 const originalConfig: any = error.config
//                 if(!isRefreshing) {
//                     isRefreshing = true
//                     api.get("/user", { headers: { refreshToken: refreshToken } })
//                     .then((response: any) => {
//                         const { accessToken: token, refreshToken: newRefreshToken } = response?.data
//                         setCookie(ctx, "belezixadmin.token", token, {
//                             maxAge: 30 * 30,
//                             path: "/"
//                         })
//                         setCookie(ctx, "belezixadmin.refreshToken", newRefreshToken, {
//                             maxAge: 30 * 30,
//                             path: "/"
//                         })
//                         api.defaults.timeout = 15000
//                         api.defaults.headers["authorizaton"] = `Bearer ${token}`
//                         api.defaults.headers["refreshtoken"] = `${newRefreshToken}`
//                         failedRequestQueue.forEach((request: any) => request.onSuccess(token))
//                         failedRequestQueue = []
//                     }).catch((error: any) => {
//                         failedRequestQueue.forEach((request: any) => request.onFailure(error))
//                         failedRequestQueue = []
//                         // if(process.browser) {
//                         //     signOut()
//                         // }
//                     }).finally(() => {
//                         isRefreshing = false
//                     })
//                 }

//                 return new Promise((resolve, reject) => {
//                     failedRequestQueue.push({onSuccess:(token: string) => {
//                         originalConfig.headers["Authorization"] = `Bearer ${token}`
//                         resolve(api(originalConfig))
//                     },
//                     onFailure: (error: AxiosError) => {
//                         reject(error)
//                     }
//                 })
//                 })
//             }
//             // if(process.browser) {
//             //     signOut()
//             // }
//         }
//         return Promise.reject(error)
//     })

//     return api
// }

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
            queryClient.invalidateQueries({queryKey: ['login']})
        }
    })

    return mutate
}