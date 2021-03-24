import React, { useState } from 'react'
import Entry from "../../Components/Entry/index"
import "./style.css"

import AUDIT_NOTIFIER from "../../Components/Audited_Notifier/index";
import Modal from "../../Components/Modal/index"
import FREEZE_MODAL from "../../Components/Freeze_Modal/index"

const Home: React.FC = () => {

    const [showAudited, setShowAudited] = useState<boolean>(false)
    const [showFreezeModal, setShowFreezeModal] = useState<boolean>(false)
    const [frozenRoomiesList, setFrozenRoomiesList] = useState<string[]>([])

    const [names, setNames] = useState(["Aakash", "Deekshit", "Subash", "Rohan"])

    return (
        <>
            <div className="audit-notifer-wraper">
                <AUDIT_NOTIFIER display={showAudited} />
            </div>
            <Entry setShowAudied={setShowAudited} setShowFreezeModal={setShowFreezeModal} frozenRoomiesList={frozenRoomiesList} />
            <Modal
                open={showFreezeModal}
                onClose={() => { setShowFreezeModal(false) }}
                title={"Freeze Audit"}
            >
                <FREEZE_MODAL
                    frozenRoomiesList={frozenRoomiesList}
                    setFrozenRoomiesList={setFrozenRoomiesList}
                    names={names}
                    setNames={setNames}
                />
            </Modal>
        </>
    )
}

export default Home
