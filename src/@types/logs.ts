export interface ILogs {
    id: string,
    amount: number,
    paid_By: string,
    description: string,
    currentTime: string
}

export interface LogsContextTypes {
    logs?:ILogs[] | [],
    setLogs?: React.Dispatch<React.SetStateAction<ILogs[] | []>>
}