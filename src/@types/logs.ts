import { IAudit } from "./audit";

export interface ILogs {
    _id: string,
    amount: number,
    paid_By: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

export interface LogsContextTypes {
    logs?:ILogs[] | [],
    setLogs?: React.Dispatch<React.SetStateAction<ILogs[] | []>>
    audits?: IAudit,
    setAudits?: React.Dispatch<React.SetStateAction<IAudit | undefined>>,
    profile_pics?: React.MutableRefObject<string[]>
}