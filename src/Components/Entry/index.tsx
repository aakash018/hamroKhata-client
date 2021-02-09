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
        try {
                if(process.env.REACT_APP_API_ENDPOINT){
                    setShowAudied(true)
                    const entry_response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/entry`, payload)
                    if(entry_response as unknown as string === "Errro with database"){
                        setLoading(false)
                        return console.log(entry_response)
                    }
                    //? TO LOAD NEW AUDIT AFTER ENTRY
                    const response = await axios
                                        .get<IAudit>(`${process.env.REACT_APP_API_ENDPOINT}/api/audit`)
                    if(setAudits){
                        setAudits(response.data)
                    }
            
                    setLoading(false)
                    setTimeout(() => {
                        setShowAudied(false)
                    }, 1500)
                }
                // clearTimeout(notifier_timer)

        } catch {
            setLoading(false)
            console.error("Error on connecting to server")
        }
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
