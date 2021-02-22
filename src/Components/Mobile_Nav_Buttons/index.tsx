import React from 'react'
import { useHistory } from 'react-router-dom';
import "./style.css";
interface Props {
  label: string,
  path: string
}


const MOBILE_NAV_BUTTONS: React.FC<Props> = ({ label, path }) => {

  const history = useHistory()

  const handleClick = () => {
    history.push(path)
  }

  return (
    <>
      <button id="mobile-nav-button" onClick={handleClick}>
        <img src={label} alt="nav-icons" />
      </button>
    </>
  )
}

export default MOBILE_NAV_BUTTONS
