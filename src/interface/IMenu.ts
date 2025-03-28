export interface IMenu {
    id?: number,
    items?: IMenuItem[]
}

export interface IMenuItem {
    id?: number,
    name: string,
    price: number,
    category: string,
    available: boolean
    menu: { id: number }
}