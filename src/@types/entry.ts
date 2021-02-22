export interface IEntry {
    amount: number,
    paid_by: string,
    description: string,
    freeze: boolean,
    frozenRoomies: Array<string>
}

export interface IPayment {
    amount: number,
    paid_by: string,
    paid_to: string
}