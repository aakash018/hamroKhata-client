import "./style.css";

import React, { useEffect, useState } from 'react'
import AuditCard from "../../Components/AuditCard/index"
import { IAudit } from "../../@types/audit";
import axios from "axios";
import { useLogs } from "../../Context/Logs";
// Profile Pics


interface Error {
    display: boolean,
    errorMessage: string
}




const Audit: React.FC = () => {

    const { audits, setAudits, profile_pics } = useLogs()

    // const [audits, setAudits] = useState<IAudit>()
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        (
            async () => {
                if (audits == null && process.env.REACT_APP_API_ENDPOINT) {
                    try {
                        setLoading(true)
                        const response = await axios
                            .get<IAudit>(`${process.env.REACT_APP_API_ENDPOINT}/api/audit`)
                        setLoading(false)
                        if (response.data.message === "No Data Found") {
                            return setError({
                                display: true,
                                errorMessage: response.data.message
                            })
                        }
                        if (setAudits) {
                            setAudits(response.data)
                        }
                    } catch {
                        setLoading(false)
                        setError({
                            display: true,
                            errorMessage: "Error Connecting To Database !"
                        })
                    }
                }
            }
        )()
    }, [audits, setAudits])

    return (
        <div>
            <div className="audit-wraper">
                <div className="audit-container">
                    {loading && <h1>Loading...</h1>}
                    {error?.display && <h1>{error.errorMessage}</h1>}
                    {audits && !error?.display && Object.keys(audits).map((name, i) => (
                        <AuditCard
                            key={i}
                            names={Object.keys(audits![name as any])}
                            amounts={Object.values(audits![name as any])}
                            profile_pic={profile_pics!.current[i]}
                        />

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Audit
