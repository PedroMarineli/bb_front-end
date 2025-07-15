export interface ICreateUser {
    username: string,
    password: string,
    role: "USER" | "ADMIN"
}

export interface IUpdateUser {
    id: number,
    username: string,
    password: string,
    role: "USER" | "ADMIN"
}

export interface IListUsers {
    content: IUpdateUser[],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}