import React from 'react'
import IError from "../../@types/error"
import "./style.css"
const ErrorContainer: React.FC<IError> = ({ display, errorMessage }) => {
    return (
        <>
            {display && <div id="error-container">
                {errorMessage}
            </div>}
        </>
    )
}

export default ErrorContainer
