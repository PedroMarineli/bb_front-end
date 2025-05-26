export interface IGetReports {
    mostOrderedItems: [
        {
            id: number,
            name: string,
            quantity: number
        }
    ],
    leastOrderedItems: [
        {
            id: number,
            name: string,
            quantity: number            
        }
    ],
    totalRevenue: number
}