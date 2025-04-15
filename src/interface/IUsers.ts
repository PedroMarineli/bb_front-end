export interface ICreateUser {
    username: string,
    password: string
}

export interface IUpdateUser {
    id: number,
    username: string,
    password: string
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