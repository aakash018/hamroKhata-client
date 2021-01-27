import axios from 'axios'
import React, { useEffect } from 'react'
import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"

const Logs:React.FC = () => {

    const { logs, setLogs } = useLogs()

    useEffect(() => {
       (
           async () => {
               console.log(logs)
               if(logs?.length === 0){
                   console.log("Ran")
                    const response = await axios.get<ILogs[]>("/api/logs")
                    if(setLogs){
                        setLogs(response.data)
                    }
                }
           }
       )()
    }, [setLogs, logs])

    console.log(logs)

    return (
        <div>
            {logs && (logs as ILogs[]).map((log) => (
                log.paid_By + " "
            ))}
        </div>
    )
}

export default Logs
