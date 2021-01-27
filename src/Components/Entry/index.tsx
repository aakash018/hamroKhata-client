import axios from "axios"
import { FormEvent } from "react"

import "./style.css"

const Entry:React.FC = () => {

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        axios.get("/api")
    }

    return (
        <div className="entry-wraper">
            <div className="entry-container">
                <form onSubmit={handleSubmit}>
                    <section>
                    <label htmlFor="amount">Amount</label>
                    <input placeholder="Amount" type="number" id="amount"/>
                    </section>
                    <section>
                    <label htmlFor="person-select">Paid By</label>
                    <select id="person-select">
                        <option>Aakash</option>
                        <option>Deekshit</option>
                        <option>Subash</option>
                        <option>Yaman</option>
                    </select>
                    </section>
                    <section>
                    <label htmlFor="desc-area">Description</label>
                    <textarea style={{resize: "none"}} id="desc-area"/>
                    </section>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Entry
