export interface IEntry {
    amount: number,
    paid_by: string,
    description: string,
    freeze: boolean,
    frozenRoomies: Array<string>
}