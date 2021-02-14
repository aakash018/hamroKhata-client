import React from 'react'
import { useHistory } from "react-router-dom"

import "./style.css";

interface Props {
    path: "/" | "/payment"
}

const ENTRY_SWITCH_BUTTON: React.FC<Props> = ({ children, path }) => {

    const history = useHistory()

    const handleClick = () => {
        history.push(path)
    }

    return (
        <>
            <button onClick={handleClick} id="exange-button-main">{children}</button>
        </>
    )
}

export default ENTRY_SWITCH_BUTTON
