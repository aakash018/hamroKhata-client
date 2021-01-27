import React, { useContext, useState } from "react"
import { ILogs , LogsContextTypes } from "../@types/logs"

const LogsContext = React.createContext<LogsContextTypes>({})
export const  useLogs = () => {
    return useContext(LogsContext)
}
const LogsProvider:React.FC = ({ children }) => {

    const [logs, setLogs] = useState<ILogs[] | []>([])

    const values = {
        logs,
        setLogs
    }
    return (
        <LogsContext.Provider value={values}> 
            {children}
        </LogsContext.Provider>
    )
}

export default LogsProvider