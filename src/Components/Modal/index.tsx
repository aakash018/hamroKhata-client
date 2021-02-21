import React from 'react'
import ReactDOM from "react-dom"
import "./style.css"

interface Props {
    open: boolean,
    onClose: () => any
    children: JSX.Element
    title: string
}

const portalElement = document.getElementById("portal-modal")

const Modal: React.FC<Props> = ({ onClose, children, open, title }) => {

    if (!open) return null

    if (portalElement) {
        return (
            ReactDOM.createPortal(
                <>
                    <div className="modal-wraper" onClick={onClose}>
                        <div className="modal-container">
                            <section className="modal-title">
                                <span>{title}</span>
                                <section role="button" className="cancle-button" onClick={onClose}>C</section>
                            </section>
                            {children}
                        </div>
                    </div>
                </>
                , portalElement)
        )
    } else {
        return null
    }
}

export default Modal
