export interface ICreateOrder {
    totalValue: number,
    paymentMethod: "CASH" | "PIX" | "CREDIT_CARD" | "DEBIT-CARD",
    orderStatus: "CREATED" | "PREPARING" | "FINISHED" | "CANCELED",
    desk: { id: number}
}

export interface ICreateOrderItem {
    quantity: number,
    menuItem: { id: number }
    order: { id: number }
}