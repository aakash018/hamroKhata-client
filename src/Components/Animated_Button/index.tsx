import React from 'react'
import "./style.css"

interface Props {
    onClick: () => any
}
const AnimatedButton: React.FC<Props> = ({ onClick, children }) => {
    return (
        <>
            <button onClick={() => onClick()} className="animated-buttton">{children}</button>
        </>
    )
}

export default AnimatedButton
