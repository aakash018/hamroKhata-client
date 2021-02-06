import axios from "axios"
import { FormEvent, useRef, useState } from "react"
import { IAudit } from "../../@types/audit"
import { useLogs } from "../../Context/Logs"

import "./style.css"

interface Props {
    setShowAudied: React.Dispatch<React.SetStateAction<boolean>>
}

const Entry:React.FC<Props> = ({setShowAudied}) => {

    const amount_input:React.RefObject<HTMLInputElement> = useRef(null)
    const paid_by:React.RefObject<HTMLSelectElement> = useRef(null)
    const description:React.RefObject<HTMLTextAreaElement>  = useRef(null)

    const [loading, setLoading] = useState<boolean>(false)
    const { setAudits } = useLogs()

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const payload = {
            amount: amount_input.current?.value,
            paid_by: paid_by.current?.value,
            description: description.current?.value
        }
        setShowAudied(true)
        await axios.post("/api/entry", payload)
            
        //? TO LOAD NEW AUDIT AFTER ENTRY
        const response = await axios
                            .get<IAudit>("/api/audit")
        if(setAudits){
            setAudits(response.data)
        }


        setLoading(false)
        setTimeout(() => {
            setShowAudied(false)
        }, 2000)
        // clearTimeout(notifier_timer)
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
                        <textarea id="desc-area" ref={description} maxLength={120} required/>
                    </section>
                    <button type="submit" disabled={loading}>{!loading? "Submit": "Auditing"}</button>
                </form>
            </div>
        </div>
    )
}

export default Entry
