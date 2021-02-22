import React from 'react'

interface Props {
    name: string,
    onRemoveName: () => any,
}

const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "20px",

    fontSize: "1.3rem",

    // backgroundColor: "red",
}

const cancleButtonStyle: React.CSSProperties = {
    userSelect: "none",
    cursor: "pointer",
    fontSize: "1.6rem"
}



const SelectedNames: React.FC<Props> = ({ name, onRemoveName }) => {

    return (
        <div style={containerStyle}>
            <span>
                {name}
            </span>
            <section
                className="cancle-selected-name"
                onClick={onRemoveName}
                style={cancleButtonStyle}
            >
                &times;
            </section>
        </div>
    )
}

export default SelectedNames
