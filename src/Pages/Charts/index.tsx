import React, { useState } from 'react'

import "./style.css"
import Monthly from "../../Components/Charts/Monthly"
import Weekly from "../../Components/Charts/Weekly"
import AnimatedButton from "../../Components/Animated_Button/index"

const Charts: React.FC = () => {

    const [displayMonthly, setDisplayMonthly] = useState(true)
    const [displayWeekly, setDisplayWeekly] = useState(false)

    return (
        <div id="charts">
            <div className="chartDisplay">
                <div>
                    <Monthly width={700} height={500} display={displayMonthly} />
                    <Weekly width={700} height={500} display={displayWeekly} />
                </div>
            </div>
            <div className="chartSelection">
                <AnimatedButton onClick={() => { setDisplayMonthly(true); setDisplayWeekly(false) }}>Monthly</AnimatedButton>
                <AnimatedButton onClick={() => { setDisplayMonthly(false); setDisplayWeekly(true) }} >Weekly</AnimatedButton>
            </div>

        </div>
    )
}
export default Charts
