import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./style.css"

import { useLogs } from '../../Context/Logs'
import { ILogs } from "../../@types/logs"
import LogsTable from "../../Components/Logs_Table/index"
import IError from '../../@types/error'

import loadingAnimation from "../../images/icons/loadingAnimation.svg"
import Modal from '../../Components/Modal'
import MainButton from '../../Components/MainButton'
import { IAudit } from '../../@types/audit'
import ErrorContainer from '../../Components/ErrorContainer/ErrorContainer'

interface IDeleteInfo {
    id: string,
    date: Date
}

const Logs: React.FC = () => {

    const { logs, setLogs, setAudits } = useLogs()

    const [loading, setLoading] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState<IError>({
        display: false,
        errorMessage: ""
    })


    const sendLogRequest = useRef(true)
    const log_request_position = useRef(0)
    const infoForDeleting = useRef<IDeleteInfo>({
        id: "",
        date: new Date()
    })
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
                    if (logs?.length === 0) {
                        setLoading(true)
                        logsCount.current = await axios.get<number>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs/count`)
                        // console.log(logsCount.current.data)
                        setLoading(false)
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
                if (element.scrollTop >= element.scrollHeight - element.offsetHeight + 1) {
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


    const handelDelete = async () => {

        if (infoForDeleting.current.id === "" || infoForDeleting.current.date === new Date()) return
        try {
            const response = await axios
                .delete(`${process.env.REACT_APP_API_ENDPOINT}/api/logs/delete`, {
                    data: {
                        id: infoForDeleting.current.id,
                        date: infoForDeleting.current.date
                    }
                })
            if (response.data === "Error Deleting") {
                return setError({
                    display: true,
                    errorMessage: "Error Deleting"
                })
            }
            setDeleteModal(false)
            //Update Audits
            const responseAudit = await axios
                .get<IAudit>(`${process.env.REACT_APP_API_ENDPOINT}/api/audit`)
            if (setAudits) {
                setAudits(responseAudit.data)
            }


            log_request_position.current = 0
            if (setLogs) {
                setLogs([])
            }
        } catch (e) {
            console.log(e)
            setError({
                display: true,
                errorMessage: e
            })
        }
    }



    const handelDeleteModal = () => {
        setDeleteModal(true)
    }

    return (
        <div className="logs-wraper">
            {loading && logs?.length === 0 && <img src={loadingAnimation} alt="loading" />}
            {!loading && !error.display && logs?.length === 0 && <h1>No Data Found</h1>}
            {!loading && error.display && <h1>{error.errorMessage}</h1>}
            {!loading && logs?.length !== 0 && !error.display &&
                <div className="logs-container" ref={logs_container}>
                    {logs && (logs as ILogs[]).map((log, i) => (
                        <LogsTable
                            key={log._id}
                            amount={log.amount}
                            description={log.description}
                            paid_By={log.paid_By}
                            paid_at={new Date(log.createdAt).toDateString()}
                            dark={i % 2 !== 0}
                            cross={false}
                            onDeleteClick={() => {
                                infoForDeleting.current = {
                                    date: log.createdAt,
                                    id: log._id
                                }
                                handelDeleteModal()
                            }}
                        />
                    ))}
                </div>}
            <Modal
                title="Delete Entries"
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
            >
                <div className="entry-delete-modal">
                    <ErrorContainer display={error.display} errorMessage={error.errorMessage} />
                    <h1 style={{ marginBottom: "20px" }}>This will delete every logs and entries made after it. Want To delete?</h1>
                    <div className="entry-delete-modal-button">
                        <MainButton onclick={handelDelete}>Delete</MainButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Logs
