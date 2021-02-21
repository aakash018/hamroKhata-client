import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"

const Logs: React.FC = () => {

    const { logs, setLogs } = useLogs()

    const [loading, setLoading] = useState<boolean>(false)


    const sendLogRequest = useRef(true)
    const log_request_position = useRef(0)
    const logsCount = useRef<AxiosResponse<number>>()

    const logs_container: React.RefObject<HTMLDivElement> = useRef(null)

    // ! INIFINITY SCROLL NOT WORKING :
    // !     INFINITY LOOP
    // !       
    const handleLogsRequest = useCallback(async () => {
        console.log("send")
        if (sendLogRequest && process.env.REACT_APP_API_ENDPOINT) {
            sendLogRequest.current = false
            const response = await axios
                .get<ILogs[] | string>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs`,
                    { params: { log_position: log_request_position.current } }
                )
            if (setLogs) {
                if (response.data === "No Data Found") {
                    // console.log("Yo run bhayo", logs)
                    return setLoading(false)
                }
                setLogs(prev => { console.log(prev); return prev.concat(response.data as any) })
                setLoading(false)
                log_request_position.current = log_request_position.current + 10
                sendLogRequest.current = true

            }
        }
    }, [setLogs])

    useEffect(() => {
        (
            async () => {

                logsCount.current = await axios.get<number>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs/count`)
                // console.log(logsCount.current.data)

                if (logs?.length === 0) {
                    setLoading(true)
                    console.log("Anotheer also Ran")
                    handleLogsRequest()
                }
            }
        )()
    }, [setLogs, handleLogsRequest, logs?.length])


    // ! Double Data in last request
    useEffect(() => {
        const element = logs_container.current
        logs_container.current?.addEventListener("scroll", () => {
            if (element) {
                if (element.scrollTop === element.scrollHeight - element.offsetHeight + 2) {
                    //? To check for end of logs 
                    // console.log(logs)
                    if (logs!.length + 10 >= logsCount.current!.data) {
                        console.log("Not Send")
                        return ""
                    } else {
                        handleLogsRequest()
                    }
                }
            }
        })
        // return () => element?.removeEventListener("scroll", () => { })
    })

    return (
        <div className="logs-wraper">
            {loading && <h1>Loading...</h1>}
            {!loading && logs?.length === 0 && <h1>No Data Found</h1>}
            {!loading && logs?.length !== 0 &&
                <div className="logs-container" ref={logs_container}>
                    {logs && (logs as ILogs[]).map((log, i) => (
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
