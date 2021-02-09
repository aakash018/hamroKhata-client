import React, { useState } from 'react'
import Entry from "../../Components/Entry/index"
import "./style.css"

import AUDIT_NOTIFIER from "../../Components/Audited_Notifier/index";

const Home:React.FC = () => {    

    const [showAudited, setShowAudited] = useState<boolean>(false)

    // console.log(process.env.REACT_APP_API_ENDPOINT)
    return (
        <>
            <div className="audit-notifer-wraper">
                <AUDIT_NOTIFIER display={showAudited}/>
            </div>
            <Entry setShowAudied={setShowAudited}/>
        </>
    )
}

export default Home
