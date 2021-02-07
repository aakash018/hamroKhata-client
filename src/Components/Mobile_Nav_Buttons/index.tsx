import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css";
interface Props {
    onClick?: () => any,
    label: string,
    path: string
}


const MOBILE_NAV_BUTTONS:React.FC<Props> = ({label, onClick, path}) => {
    return (
        <>
          <button id="mobile-nav-button">
              <Link to={path}>
                <img src={label} alt="nav-icons"/>
              </Link>
            </button>  
        </>
    )
}

export default MOBILE_NAV_BUTTONS
