import React, { useRef } from 'react'
import MainButton from '../MainButton'
import SELECTED_NAME from "./SelectedNames"

interface Props {
    frozenRoomiesList: string[],
    setFrozenRoomiesList: React.Dispatch<React.SetStateAction<string[]>>,
    names: string[],
    setNames: React.Dispatch<React.SetStateAction<string[]>>

}

const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
}

const nameSelectorStyle: React.CSSProperties = {
    width: "40%",
    height: "40px",

    fontFamily: "var(--theme-default-font)",
    border: "1px solid var(--theme-font-color)",
    // borderRadius: "10px",

    cursor: "pointer",

    marginTop: "-20px"

}

const selectedNameStyle: React.CSSProperties = {
    width: "150px",
    marginTop: "-20px"


}

const submitButtonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "45px",
    left: "40%",
    // transform: "translate(-200%)"

}


const FREEZE_MODAL: React.FC<Props> = ({ frozenRoomiesList, setFrozenRoomiesList, names, setNames }) => {

    const selectedName: React.RefObject<HTMLSelectElement> = useRef(null)

    const handleAddName = () => {
        setFrozenRoomiesList(prev => prev.concat(selectedName.current!.value))


        //? Remove Selected Names from the select 
        setNames(
            prev => (
                prev.filter(name => (
                    name !== selectedName.current?.value
                ))
            )
        )
    }

    const handleRemoveNames = (nameToRemove: string) => {
        setFrozenRoomiesList(prev => (
            prev.filter(
                name => (
                    name !== nameToRemove
                )
            )
        ))

        //? Add Remove name to select
        setNames(prev => prev.concat(nameToRemove))

    }


    return (
        <>
            <div style={containerStyle}>
                <select
                    id="freeze-select"
                    ref={selectedName}
                    style={nameSelectorStyle}>
                    {
                        names.map((name, i) => (
                            <option key={i} >{name}</option>
                        ))
                    }
                </select>

                <section className="selected-names" style={selectedNameStyle}>
                    {
                        frozenRoomiesList.map((name, i) => (
                            <SELECTED_NAME
                                onRemoveName={() => handleRemoveNames(name)}
                                key={i}
                                name={name}
                            />
                        ))
                    }
                </section>
            </div>
            <section style={submitButtonStyle}>
                <MainButton onclick={handleAddName}>Add</MainButton>
            </section>
        </>
    )
}

export default FREEZE_MODAL
