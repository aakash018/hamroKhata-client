import React from 'react'
import "./style.css"

interface Props {
    type?: "submit" | "reset",
    onclick?: () => any,
    disable?: boolean,
    frozen?: boolean
}

const MainButton: React.FC<Props> = ({ children, type, onclick, disable, frozen }) => {

    return (
        <>
            <button
                type={type}
                onClick={onclick ? onclick : () => { }}
                className={`main-button ${frozen ? "frozen" : ""}`}
                disabled={disable}
            >
                {children}
            </button>
        </>
    )
}

export default MainButton
