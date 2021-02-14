import React, { useState } from 'react'
import Payment from "../Components/Payment/index";
import AUDIT_NOTIFIER from "../Components/Audited_Notifier/index"

const PaymentPage: React.FC = () => {

    const [showAudit, setShowAudit] = useState<boolean>(false)

    return (
        <>
            <div className="audit-notifer-wraper">
                <AUDIT_NOTIFIER display={showAudit} />
            </div>
            <Payment setShowAudied={setShowAudit} />
        </>
    )
}

export default PaymentPage
