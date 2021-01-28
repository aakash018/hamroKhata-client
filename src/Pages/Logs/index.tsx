import axios from 'axios'
import React, { useEffect } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"

const Logs:React.FC = () => {

    const { logs, setLogs } = useLogs()

    useEffect(() => {
       (
           async () => {
               if(logs?.length === 0){
                    const response = await axios.get<ILogs[]>("/api/logs")
                    if(setLogs){
                        setLogs(response.data)
                    }
                }
           }
       )()
    }, [setLogs, logs])

    return (
        <div className="logs-wraper">
            <div className="logs-container">
            {logs && (logs as ILogs[]).map((log, i) => (
            
                <LogsTable 
                    key={log._id} 
                    amount={log.amount} 
                    description={log.description} 
                    paid_By={log.paid_By} 
                    paid_at={new Date(log.currentTime).toDateString()} 
                    dark={i % 2 !== 0}
                />
                
            ))}
            </div>
        </div>
    )
}

export default Logs
