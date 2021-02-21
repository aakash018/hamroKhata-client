import React from 'react'
import "./style.css"

interface Props {
    type?: "submit" | "reset",
    onclick?: () => any
    disable?: boolean
}

const MainButton: React.FC<Props> = ({ children, type, onclick, disable }) => {

    return (
        <>
            <button type={type} onClick={onclick ? onclick : () => { }} id="main-button" disabled={disable}>
                {children}
            </button>
        </>
    )
}

export default MainButton
