import React from 'react'

interface Props {
    name: string
}

const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "20px",

    fontSize: "1.3rem",

    // backgroundColor: "red",
}

const SelectedNames: React.FC<Props> = ({ name }) => {
    return (
        <div style={containerStyle}>
            <span>
                {name}
            </span>
            <section className="cancle-selected-name">x</section>
        </div>
    )
}

export default SelectedNames
