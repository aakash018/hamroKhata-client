import React from 'react'
import "./style.css";

interface Props {
    names: string[],
    amounts: number[],
    profile_pic: string
}

const index:React.FC<Props> = ({names, amounts, profile_pic}) => {
    return (
        <div className="audit-card-container">
            <section className="audit-profile-picture">
                <img src={profile_pic} alt={"profile_pic"}/>
            </section>
            <section className="audit-data-container">
                <div className="audit-data">
                    <section className="audit-data-name" >
                        {names[0]}
                    </section>
                    <section className="audit-data-amount">
                        {amounts[0]}
                    </section>
                </div>
                <div className="audit-data">
                    <section className="audit-data-name" >
                        {names[1]}     
                    </section>
                    <section className="audit-data-amount">
                        {amounts[1]}
                    </section>
                </div>
                <div className="audit-data">
                    <section className="audit-data-name" >
                        {names[2]}
                    </section>
                    <section className="audit-data-amount">
                        {amounts[2]}
                    </section>
                </div>
            </section>
        </div>
    )
}

export default index
