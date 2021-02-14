import axios from 'axios'
import React, { useRef, useState } from 'react'
import MainButton from '../MainButton'
import "./style.css"

interface Props {
    setShowAudied: React.Dispatch<React.SetStateAction<boolean>>
}

const Payment: React.FC<Props> = ({ setShowAudied }) => {

    const paid_by: React.RefObject<HTMLSelectElement> = useRef(null)
    const paid_to: React.RefObject<HTMLSelectElement> = useRef(null)
    const amount: React.RefObject<HTMLInputElement> = useRef(null)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payLoad = {
            paid_by: paid_by.current?.value,
            paid_to: paid_to.current?.value,
            amount: amount.current?.value,
        }
        setLoading(true)
        await axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/api/payment`, payLoad)
        setLoading(false)
        setShowAudied(true)
        setTimeout(() => {
            setShowAudied(false)
        }, 1500)
    }

    return (
        <div className="payment-wraper">
            <div id="payment-container">
                <form onSubmit={handleSubmit}>
                    <section className="payment-payer-info">
                        <section>
                            <label htmlFor="from-payment-input">From</label>
                            <select id="from-payment-input" required ref={paid_by}>
                                <option>Aakash</option>
                                <option>Deekshit</option>
                                <option>Subash</option>
                                <option>Yaman</option>
                            </select>
                        </section>
                        <section>
                            <label htmlFor="to-payment-input" >To</label>
                            <select id="from-payment-input" ref={paid_to} required>
                                <option>Aakash</option>
                                <option>Deekshit</option>
                                <option>Subash</option>
                                <option>Yaman</option>
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
