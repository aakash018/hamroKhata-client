import axios from "axios"
import { FormEvent, useRef, useState } from "react"
import { IAudit } from "../../@types/audit"
import { useLogs } from "../../Context/Logs"
import MainButton from "../MainButton/index"
import SECONDARY_BUTTON from "../Secondary_Button/index"

import Exange_button_icon from "../../images/icons/exange_entry.svg";
import Freeze_icon from "../../images/icons/freeze_audit.svg"

import "./style.css"
import { ILogs } from "../../@types/logs"
import { IEntry } from "../../@types/entry"

interface Props {
    setShowAudied: React.Dispatch<React.SetStateAction<boolean>>,
    setShowFreezeModal: React.Dispatch<React.SetStateAction<boolean>>,
    frozenRoomiesList: string[]
}

const Entry: React.FC<Props> = ({ setShowAudied, setShowFreezeModal, frozenRoomiesList }) => {

    const amount_input: React.RefObject<HTMLInputElement> = useRef(null)
    const paid_by: React.RefObject<HTMLSelectElement> = useRef(null)
    const description: React.RefObject<HTMLTextAreaElement> = useRef(null)

    const [loading, setLoading] = useState<boolean>(false)
    const { setAudits, setLogs } = useLogs()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        let payload: IEntry = {
            amount: 0,
            description: "",
            freeze: false,
            frozenRoomies: [],
            paid_by: ""

        };
        if (frozenRoomiesList.length === 0) {
            payload = {
                amount: parseInt(amount_input.current!.value),
                paid_by: paid_by.current!.value,
                description: description.current!.value,
                freeze: false,
                frozenRoomies: []
            }
        } else {
            payload = {
                amount: parseInt(amount_input.current!.value),
                paid_by: paid_by.current!.value,
                description: description.current!.value,
                freeze: true,
                frozenRoomies: frozenRoomiesList
            }
        }


        try {
            if (process.env.REACT_APP_API_ENDPOINT) {
                const entry_response = await axios
                    .post(`${process.env.REACT_APP_API_ENDPOINT}/api/entry`, payload)
                if (entry_response as unknown as string === "Errro with database") {
                    setLoading(false)
                    return console.log(entry_response)
                }


                //? TO LOAD NEW AUDIT AFTER ENTRY
                const responseAudit = await axios
                    .get<IAudit>(`${process.env.REACT_APP_API_ENDPOINT}/api/audit`)
                if (setAudits) {
                    setAudits(responseAudit.data)
                }

                //? TO LOAD NEW LOGS

                const responseLogs = await axios
                    .get<ILogs[] | string>(`${process.env.REACT_APP_API_ENDPOINT}/api/logs`,
                        { params: { log_position: 0 } }
                    )
                if (setLogs) {
                    if (responseLogs.data === "No Data Found") {
                        return setLoading(false)
                    }
                    // console.log("Entry")
                    setLogs(responseLogs.data as any)
                    setLoading(false)
                    setShowAudied(true)
                    setTimeout(() => {
                        setShowAudied(false)
                    }, 1500)
                }
                // clearTimeout(notifier_timer)
            }
        } catch {
            setLoading(false)
            console.error("Error on connecting to server")
        }
    }

    return (
        <div className="entry-wraper">
            <div className="entry-container">
                <section className="exange_button">
                    <SECONDARY_BUTTON path="/payment">
                        <img src={Exange_button_icon} alt="exange_button" />
                    </SECONDARY_BUTTON>
                </section>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="amount">Amount</label>
                        <input placeholder="Amount" type="number" id="amount" ref={amount_input} required />
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
                        <textarea id="desc-area" ref={description} maxLength={120} required />
                    </section>
                    <section className="entry-submit">
                        <MainButton
                            type="submit"
                            disable={loading}
                            frozen={frozenRoomiesList.length !== 0}
                        >
                            {!loading ? "Submit" : "Auditing"}
                        </MainButton>
                    </section>
                </form>
                <section className="freeze-audit-button">
                    <SECONDARY_BUTTON onClick={() => setShowFreezeModal(true)}>
                        <img src={Freeze_icon} alt="freeze_button" />
                    </SECONDARY_BUTTON>
                </section>
            </div>
        </div>
    )
}

export default Entry
