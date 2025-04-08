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