import React from 'react'
import "./style.css"
interface Props {
    text: string,
    show: boolean
}

const Desc:React.FC<Props> = ({text, show}) => {
    return (
        <section className={`description-area ${show? "showDesc" : ""}`}>
            <section className="title-desc">
                Description
            </section>
            <section className="desc-area">
            {text}
            </section>
                
        </section>
    )
}

export default Desc;
