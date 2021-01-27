import axios from "axios"
import { FormEvent, useRef } from "react"

import "./style.css"

const Entry:React.FC = () => {

    const amount_input:React.RefObject<HTMLInputElement>= useRef(null)
    const paid_by:React.RefObject<HTMLSelectElement> = useRef(null)
    const description:React.RefObject<HTMLTextAreaElement>  = useRef(null)

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        const payload = {
            amount: amount_input.current?.value,
            paid_by: paid_by.current?.value,
            description: description.current?.value
        }
        const resp = await axios.post("/api/entry", payload)
        console.log(resp)
    }

    return (
        <div className="entry-wraper">
            <div className="entry-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="amount">Amount</label>
                        <input placeholder="Amount" type="number" id="amount" ref={amount_input} required/>
                    </section>
                    <section>
                        <label htmlFor="person-select">Paid By</label>
                        <select id="person-select" ref={paid_by} required>
                            <option>Aakash</option>
                            <option>Deekshit</option>
                            <option>Subash</option>
                            <option>Yaman</option>
                        </select>
                    </section>
                    <section>
                        <label htmlFor="desc-area">Description</label>
                        <textarea style={{resize: "none"}} id="desc-area" ref={description} required/>
                    </section>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Entry
