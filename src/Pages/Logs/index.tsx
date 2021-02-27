import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"
import IError from '../../@types/error'

import loadingAnimation from "../../images/icons/loadingAnimation.svg"



const Logs: React.FC = () => {

    const { logs, setLogs } = useLogs()

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<IError>({
        display: false,
        errorMessage: ""
    })


    const sendLogRequest = useRef(true)
    const log_request_position = useRef(0)
    const logsCount = useRef<AxiosResponse<number>>()

    const logs_container: React.RefObject<HTMLDivElement> = useRef(null)

    // ! INIFINITY SCROLL NOT WORKING :
    // !     INFINITY LOOP
    // !       
    const handleLogsRequest = useCallback(async () => {
        try {
            if (sendLogRequest.current && process.env.REACT_APP_API_ENDPOINT) {
                sendLogRequest.current = false
                console.log("Request Position", log_request_position.current)
                const response = await axios
                    .get<ILogs[] | string>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs`,
                        { params: { log_position: log_request_position.current } }
                    )
                log_request_position.current = log_request_position.current + 10
                if (setLogs) {
                    if (response.data === "No Data Found") {
                        return setLoading(false)
                    }
                    setLogs(prev => { return prev.concat(response.data as any) })
                    setLoading(false)
                    sendLogRequest.current = true

                }
            }
        } catch {
            setLoading(false)
            setError({
                display: true,
                errorMessage: "Error Connecting To DataBase"
            })
        }
    }, [setLogs])

    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true)
                    logsCount.current = await axios.get<number>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs/count`)
                    // console.log(logsCount.current.data)
                    setLoading(false)
                    if (logs?.length === 0) {
                        setLoading(true)
                        handleLogsRequest()
                    }
                } catch {
                    setLoading(false)
                    setError({
                        display: true,
                        errorMessage: "Error Connecting To DataBase"
                    })
                }
            }
        )()
    }, [setLogs, handleLogsRequest, logs?.length])


    // ! Double Data in last request
    useEffect(() => {
        const element = logs_container.current
        element?.addEventListener("scroll", () => {
            if (element) {
                if (element.scrollTop === element.scrollHeight - element.offsetHeight + 2) {
                    //? To check for end of logs 
                    if (logs!.length + 10 >= logsCount.current!.data) {
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
            {/* {loading && <h1>Loading...</h1>} */}
            {loading && <img src={loadingAnimation} />}
            {!loading && !error.display && logs?.length === 0 && <h1>No Data Found</h1>}
            {!loading && error.display && <h1>{error.errorMessage}</h1>}
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
