import React, { useRef, useState } from 'react'
import "./style.css";
import Delete from "../../images/icons/trash.svg"
import Desc from "./Desc/index";

interface Props {
    paid_By: string,
    amount: number,
    description: string,
    paid_at: string,
    dark: boolean,
    cross: boolean,
    onDeleteHover?: () => any;
    onDeleteClick: () => any;
}

const LogsTable: React.FC<Props> = ({ amount, description, paid_By, paid_at, dark, cross, onDeleteHover, onDeleteClick }) => {

    const [showDesc, setShowDesc] = useState<boolean>(false)
    const deleteButton = useRef(null)

    const handleToggleDesc = () => {
        setShowDesc(prev => !prev)
    }

    return (
        <>
            <div className={`table-row ${dark ? "dark" : ""} ${cross ? "maySelectedToDelete" : ""}`} onClick={handleToggleDesc}>
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
                <section
                    className="delete-icon"
                    role="button"
                    ref={deleteButton}
                    onMouseOver={onDeleteHover}
                    onClick={onDeleteClick}
                >
                    <img src={Delete} alt="deleteIcon" width="15px" height="15px" />
                </section>
            </div>
            <Desc text={description} show={showDesc} />
        </>
    )
}

export default LogsTable
