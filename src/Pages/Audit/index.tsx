import "./style.css";

import React, { useEffect, useState } from 'react'
import AuditCard from "../../Components/AuditCard/index"
import { IAudit } from "../../@types/audit";
import axios from "axios";

interface Error {
    display: boolean,
    errorMessage: string
}

const Audit:React.FC = () => {

        const [audit_info, setAuditInfo] = useState<IAudit>()
        const [error, setError] = useState<Error>()
        const [loading, setLoading] = useState<boolean>(false)

        useEffect(() => {
            (
                async () => {
                    setLoading(true)
                    const response = await axios
                                            .get<IAudit>("/api/audit")
                    setAuditInfo(response.data)
                    setLoading(false)
                    if(response.data.message === "No Data Found"){
                        setError({
                            display: true,
                            errorMessage: response.data.message
                        })
                    }
                }
            )()
        }, [])

    return (
        <div>
            <div className="audit-wraper">
                <div className="audit-container">
                    {loading && <h1>Loading...</h1>}
                    {error?.display && <h1>{error.errorMessage}</h1>}
                    {audit_info && !error?.display && Object.keys(audit_info).map((name, i) => (
                        <AuditCard key={i} names={Object.keys(audit_info![name as any])} amounts={Object.values(audit_info![name as any])}/>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Audit
