import axios from "axios";

const API_URL = 'http://localhost:8080';

export const axiosInstance = axios.create({
    baseURL: API_URL
})

export class LoginService{
    login(login: String, senha: String){
        return axiosInstance.post("/login", 
            { username: login, password: senha});
    }
}