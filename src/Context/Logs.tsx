import React, { useContext, useRef, useState } from "react"
import { IAudit } from "../@types/audit"
import { ILogs , LogsContextTypes } from "../@types/logs"

import Aakash from "../images/Aakash.jpg";
import Deekshit from "../images/dick.jpg";
import Subash from "../images/Subbs.jpg";
import Yaman from "../images/Yaman.jpg";



const LogsContext = React.createContext<LogsContextTypes>({})
export const  useLogs = () => {
    return useContext(LogsContext)
}
const LogsProvider:React.FC = ({ children }) => {

    const [logs, setLogs] = useState<ILogs[] | []>([])
    const [audits, setAudits] = useState<IAudit>()
    const profile_pics = useRef<string[]>([Aakash, Deekshit, Subash, Yaman])

    const values = {
        logs,
        setLogs,
        audits,
        setAudits,
        profile_pics
    }
    return (
        <LogsContext.Provider value={values}> 
            {children}
        </LogsContext.Provider>
    )
}

export default LogsProvider