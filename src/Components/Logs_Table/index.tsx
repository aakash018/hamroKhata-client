import React, { useState } from 'react'
import "./style.css"
import Desc from "./Desc/index";
interface Props {
    paid_By: string,
    amount: number,
    description: string,
    paid_at: string,
    dark: boolean
}

const LogsTable: React.FC<Props> = ({ amount, description, paid_By, paid_at, dark }) => {

    const [showDesc, setShowDesc] = useState<boolean>(false)

    const handleToggleDesc = () => {
        setShowDesc(prev => !prev)
    }

    return (
        <>
            <div className={`table-row ${dark ? "dark" : ""}`} onClick={handleToggleDesc}>
                <section className={`triangle-arrow ${showDesc ? "opened" : ""}`} ></section>
                <section className="paid-by">
                    {paid_By}
                </section>
                <section className="amount">
                    {amount}
                </section>
                <section className="paid-time">
                    {paid_at}
                </section>
                <section className="delete-icon">
                    <span className="material-icons">
                        delete_forever
                </span>
                </section>
            </div>
            <Desc text={description} show={showDesc} />
        </>
    )
}

export default LogsTable
