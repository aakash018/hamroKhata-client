import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"

const Logs:React.FC = () => {

    const { logs, setLogs } = useLogs()
    const [loading, setLoading] = useState<boolean>(false)
    const sendLogRequest = useRef(true)
    const log_request_position = useRef(0)

    const logs_container:React.RefObject<HTMLDivElement> = useRef(null)

    // ! INIFINITY SCROLL NOT WORKING :
    // !     INFINITY LOOP
   // !       
    const handleLogsRequest = useCallback( async () => {
            if(sendLogRequest){
                sendLogRequest.current = false
            const response = await axios
                                    .get<ILogs[] | string>("https://hamrokhatav2-server.herokuapp.com/api/logs", 
                                        { params: {log_position: log_request_position.current} } 
                                    )
            if(setLogs){
                console.log(response.data)
                if(response.data === "No Data Found"){
                    return setLoading(false)
                }
                setLogs(prev => prev.concat(response.data as any))
                setLoading(false)
                log_request_position.current = log_request_position.current + 10
                sendLogRequest.current = true

            }
        }  
    }, [setLogs])

    useEffect(() => {
       (
           async () => {
               if(logs?.length === 0){
                    setLoading(true)
                   handleLogsRequest()
                }
           }
       )()
    }, [setLogs, logs, handleLogsRequest])


    // ! Double Data in last request
    useEffect(() => {
        const element = logs_container.current
        logs_container.current?.addEventListener("scroll", () => {
            if(element){
                // console.log(element.scrollTop + " ")
                // console.log(element.scrollHeight - element.offsetHeight + 2)
                if(element.scrollTop === element.scrollHeight - element.offsetHeight + 2){
                    handleLogsRequest()
                }
            }
        })
        // return () => element?.removeEventListener("scroll", () => {})
    })

    return (
        <div className="logs-wraper">
            {loading && <h1>Loading...</h1>}
            {!loading && logs?.length === 0 && <h1>No Data Found</h1>}
            {!loading && logs?.length !== 0 && 
            <div className="logs-container" ref={logs_container}>
                {logs &&  (logs as ILogs[]).map((log, i) => (
                    <LogsTable 
                        key={log._id} 
                        amount={log.amount} 
                        description={log.description} 
                        paid_By={log.paid_By} 
                        paid_at={new Date(log.createdAt).toDateString()} 
                        dark={i % 2 !== 0}
                    /> 
            ))}
            </div>}
        </div>
    )
}

export default Logs
