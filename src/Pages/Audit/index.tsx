import React from 'react'
import "./style.css";
import AuditCard from "../../Components/AuditCard/index"
const Audit:React.FC = () => {
    return (
        <div>
            <div className="audit-wraper">
                <div className="audit-container">
                    <AuditCard names={["a", "b", "c", "d"]} amounts={[1,23,4,8]}/>
                    <AuditCard names={["a", "b", "c", "d"]} amounts={[1,23,4,8]}/>
                    <AuditCard names={["a", "b", "c", "d"]} amounts={[1,23,4,8]}/>
                    <AuditCard names={["a", "b", "c", "d"]} amounts={[1,23,4,8]}/>
                </div>
            </div>
        </div>
    )
}

export default Audit
