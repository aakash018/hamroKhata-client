import React from 'react'
import "./style.css"

interface Props {
    display: boolean
}

const Audited_Notifier:React.FC<Props> = ({ display }) => {
    return (
        <>
            {display && <div className={!display ? "audited-notifier" : "audited-notifier active"}>
                <section className="notifier-logo">
                <span className="material-icons">
                    done_all
                </span>
                </section>
                <section className="notifier-text">Audited</section>
            </div>}
        </>
    )
}

export default Audited_Notifier
