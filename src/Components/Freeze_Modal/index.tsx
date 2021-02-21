import React, { useRef, useState } from 'react'
import MainButton from '../MainButton'
import SELECTED_NAME from "./SelectedNames"


const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"

}

const selectedNameStyle: React.CSSProperties = {
    width: "150px",
}


const FREEZE_MODAL = () => {

    const names = useRef(["Aakash", "Deekshit", "Subash", "Yaman"])
    const selectedName: React.RefObject<HTMLSelectElement> = useRef(null)

    const [listofSelectedNames, setListofSeltctedNames] = useState<string[]>([])

    const handleAddName = () => {
        setListofSeltctedNames(prev => prev.concat(selectedName.current!.value))
    }

    return (
        <div>
            <div style={containerStyle}>
                <select id="freeze-select" ref={selectedName}>
                    {
                        names.current.map((name, i) => (
                            <option key={i} >{name}</option>
                        ))
                    }
                </select>

                <section className="selected-names" style={selectedNameStyle}>
                    {
                        listofSelectedNames.map(name => <SELECTED_NAME name={name} />)
                    }
                </section>
            </div>
            <MainButton onclick={handleAddName}>Add</MainButton>
        </div>
    )
}

export default FREEZE_MODAL
