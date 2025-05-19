export interface IMenu {
    id?: number,
    itens?: IMenuItem[]
}

export interface IMenuItem {
    id?: number,
    name: string,
    description?: string,
    price?: number,
    category: string,
    available?: boolean
    //menu?: { id?: number }
}

export interface IPostMenuItem {
    price?: number,
    name?: string,
    description?: string,
    category?: string,
    available?: boolean,
    menu: IMenu
}

export interface IGetMenu {
    id: number,
    menuLength: number
}

export interface IGetMenuItens {
    content: IMenuItem[]
}