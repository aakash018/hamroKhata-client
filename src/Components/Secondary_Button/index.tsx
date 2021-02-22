import React from 'react'
import { useHistory } from "react-router-dom"

import "./style.css";

interface Props {
    path?: "/" | "/payment"
    onClick?: () => any
}

const SECONDARY_BUTTON: React.FC<Props> = ({ children, path, onClick }) => {

    const history = useHistory()

    const handleClick = () => {
        if (path) return history.push(path)
        if (onClick) {
            onClick()
        }
    }

    return (
        <>
            <button onClick={handleClick} id="exange-button-main">{children}</button>
        </>
    )
}

export default SECONDARY_BUTTON
