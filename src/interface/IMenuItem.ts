export interface IMenuItem {
    id?: number,
    name: string,
    price: number,
    category: string,
    available: boolean
    menu: { id: number }
}