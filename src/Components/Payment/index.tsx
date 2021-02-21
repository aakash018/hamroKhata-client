import axios from 'axios'
import React, { useRef, useState } from 'react'
import MainButton from '../MainButton'
import ErrorContainer from "../ErrorContainer/ErrorContainer"
import EXANGE_BUTTON from "../Entry_Switch_Button/index"
import Exange_button_icon from "../../images/icons/exange_entry.svg";

import "./style.css"
import { IAudit } from '../../@types/audit';
import { useLogs } from '../../Context/Logs';
import IError from "../../@types/error"

interface Props {
    setShowAudied: React.Dispatch<React.SetStateAction<boolean>>
}

const Payment: React.FC<Props> = ({ setShowAudied }) => {

    const paid_by: React.RefObject<HTMLSelectElement> = useRef(null)
    const paid_to: React.RefObject<HTMLSelectElement> = useRef(null)
    const amount: React.RefObject<HTMLInputElement> = useRef(null)

    const [loading, setLoading] = useState(false)
    const [selectedForFrom, setSelectedForFrom] = useState<string>("Aakash")
    const [selectedForTo, setSelectedForTo] = useState<string>("Deekshit")
    const [error, setError] = useState<IError>({
        display: false,
        errorMessage: ""
    })

    const { setAudits } = useLogs()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payLoad = {
            paid_by: paid_by.current?.value,
            paid_to: paid_to.current?.value,
            amount: amount.current?.value,
        }
        setLoading(true)
        try {
            await axios
                .post(`${process.env.REACT_APP_API_ENDPOINT}/api/payment`, payLoad)

            //? TO UPDATE AUDITS
            const response = await axios
                .get<IAudit>(`${process.env.REACT_APP_API_ENDPOINT}/api/audit`)
            if (setAudits) {
                setAudits(response.data)
            }

            setLoading(false)
            setShowAudied(true)
            setTimeout(() => {
                setShowAudied(false)
            }, 1500)
        } catch {
            setLoading(false)
            console.log(e)
            setError({
                display: true,
                errorMessage: "Error Connecting to server"
            })
        }
    }

    const handleNameSelectForForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedForFrom(e.target.value)
    }
    const handleNameSelectForTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedForTo(e.target.value)
    }

    const names = useRef(["Aakash", "Deekshit", "Subash", "Yaman"])

    return (
        <div className="payment-wraper">
            <div id="payment-container">
                <section className="error-wraper-payment">
                    <ErrorContainer display={error.display} errorMessage={error.errorMessage} />
                </section>
                <section className="payment-exange-button">
                    <EXANGE_BUTTON path="/">
                        <img src={Exange_button_icon} alt="exange_button" />
                    </EXANGE_BUTTON>
                </section>
                <form onSubmit={handleSubmit}>
                    <section className="payment-payer-info">
                        <section>
                            <label htmlFor="from-payment-input">From</label>
                            <select className="from-payment-input-from" required ref={paid_by} onChange={handleNameSelectForForm}>
                                {
                                    names.current.map((name, i) => {
                                        if (selectedForTo !== name) {
                                            return <option key={i} >{name}</option>
                                        } else {
                                            return ""
                                        }
                                    })
                                }
                            </select>
                        </section>
                        <section>
                            <label htmlFor="to-payment-input" >To</label>
                            <select className="from-payment-input-to" ref={paid_to} required onChange={handleNameSelectForTo}>
                                {
                                    names.current.map((name, i) => {
                                        if (selectedForFrom !== name) {
                                            return <option key={i} >{name}</option>
                                        } else {
                                            return ""
                                        }
                                    })
                                }
                            </select>
                        </section>
                    </section>
                    <section className="payment-amount-container">
                        <label htmlFor="amount-payment-input">Amount</label>
                        <input id="amount-payment-input" type="number" ref={amount} required />
                    </section>
                    <section className="payment-submit-button">
                        <MainButton type="submit" disable={loading}>{loading ? "Auditing" : "Submit"}</MainButton>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Payment
