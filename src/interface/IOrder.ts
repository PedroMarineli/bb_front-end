import { IMesa } from "./IDesk"
import { IMenuItem } from "./IMenu"

export interface ICreateOrder {
    totalValue: number,
    paymentMethod: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT-CARD",
    orderStatus: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED",
    desk: { id: number | null }
}

export interface ICreateOrderItem {
    quantity: number,
    menuItem: { id: number | undefined}
    order?: { id?: number }
}

export interface IListOrders {
    id: number,
    totalValue: number,
    paymentMethod: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT-CARD",
    orderItems: [OrdemItems],
    orderStatus: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED",
    desk: IMesa
}

interface OrdemItems {
    id: number,
    quantity: number,
    menuItem: IMenuItem
}