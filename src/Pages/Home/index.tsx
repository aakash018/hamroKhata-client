import React, { useState } from 'react'
import Entry from "../../Components/Entry/index"

import AUDIT_NOTIFIER from "../../Components/Audited_Notifier/index";

const Home:React.FC = () => {    

    const [showAudited, setShowAudited] = useState<boolean>(false)

    const audit_notifier_style:React.CSSProperties = {
         position: "absolute",
         bottom: "40px",
         left: "50px"
    }

    return (
        <>
            <div className="audit-notifer-wraper" style={audit_notifier_style}>
                <AUDIT_NOTIFIER display={showAudited}/>
            </div>
            <Entry setShowAudied={setShowAudited}/>
        </>
    )
}

export default Home
