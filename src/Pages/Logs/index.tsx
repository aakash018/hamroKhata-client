import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"

const Logs:React.FC = () => {

    const { logs, setLogs } = useLogs()
    const [loading, setLoading] = useState<boolean>(false)
    const log_request_position = useRef(0)

    const logs_container:React.RefObject<HTMLDivElement> = useRef(null)

    // ! INIFINITY SCROLL NOT WORKING :
    // !     INFINITY LOOP
   // !       
    const handleLogsRequest = async () => {
        console.log("Send")
        const response = await axios
                                .get<ILogs[]>("/api/logs", 
                                    { params: {log_position: log_request_position.current} } 
                                )
        if(setLogs){
            setLogs(prev => prev.concat(response.data as any))
            log_request_position.current = log_request_position.current + 5
            setLoading(false)
        }
    }

    useEffect(() => {
       (
           async () => {
               if(logs?.length === 0){
                    setLoading(true)
                   handleLogsRequest()
                }
           }
       )()
    }, [setLogs, logs])



    useEffect(() => {
        const element = logs_container.current
        logs_container.current?.addEventListener("scroll", () => {
            if(element){
                if(element.scrollTop > element.scrollHeight - element.offsetHeight){
                    handleLogsRequest()
                }
            }
        })
    })

    return (
        <div className="logs-wraper">
            {loading && <h1>Loading</h1>}
            {!loading && 
            <div className="logs-container" ref={logs_container}>
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
            </div>}
        </div>
    )
}

export default Logs
