import { IMesa } from "./IDesk"
import { IMenuItem } from "./IMenu"

export interface IGetOrder {
    id?: number,
    totalValue?: number,
    paymentMethod?: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT-CARD",
    orderItems?: [IPostOrderItem],
    orderStatus?: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED",
    desk?: IMesa,
    description?: string
}

export interface IOrderResponse {
    content: IGetOrder[],
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    }
}

export interface IPostOrder {
    orderItems: [{        
        id: number,
        quantity: number,
        menuItem: IMenuItem,
    }]
    desk: IMesa,
    description: string
}

// export interface IPostOrderItem {
//     quantity?: number,
//     menuItem?: IMenuItem,
//     order: IGetOrder
// }

export interface IPostOrderItem {
    quantity?: number,
    menuItem?: IMenuItem,
    order: { id: number }
}

export interface ICreateOrder {
    //orderItems: [OrderItems],
    desk: IMesa,
    description?: string
}

export interface OrderItems {
    id?: number,
    quantity: number,
    menuItem: IMenuItem
}



// export interface IListOrders {
//     id?: number,
//     totalValue?: number,
//     paymentMethod?: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT-CARD",
//     orderItems?: [OrderItems],
//     orderStatus: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED",
//     desk?: IMesa,
//     description?: string
// }
