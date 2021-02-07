import React from 'react'
import "./style.css"
import MOBILE_NAV_BUTTONS from "../Mobile_Nav_Buttons/index";

//Icons
import Audit from "../../images/icons/audit.svg"
import Home from "../../images/icons/home.svg"
import Logs from "../../images/icons/logs.svg"

const Footer:React.FC = () => {


    return (
        <>
            <footer>
            <div id="footer-container">
                <svg width="400" height="105" viewBox="0 0 1086 245" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M514.942 142.185C576.926 142.185 627.174 95.7326 627.174 38.4307V38.4307C627.174 27.4613 635.25 17.2086 646.22 17.2086H1043C1058.46 17.2086 1071 29.7446 1071 45.2086V230.791C1071 231.344 1070.55 231.791 1070 231.791H16C15.4477 231.791 15 231.344 15 230.791V45.2086C15 29.7447 27.536 17.2086 43 17.2086H383.664C394.634 17.2086 402.71 27.4613 402.71 38.4307V38.4307C402.71 95.7326 452.958 142.185 514.942 142.185Z" fill="#F3F3F3"/>
                    </g>
                    <defs>
                    <filter id="filter0_d" x="0" y="0.208618" width="1086" height="244.583" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/>
                    <feOffset dy="-2"/>
                    <feGaussianBlur stdDeviation="8"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.51 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                    </defs>
                </svg>
                <section className="nav-buttons-mobile home-button">
                <MOBILE_NAV_BUTTONS 
                path={"/"}
                label={
                    Home
                }
                />
                </section>

                <section className="nav-buttons-mobile audit-button">
                
                <MOBILE_NAV_BUTTONS 
                path={"/audit"} 
                label={                
                    Audit
                }
                />
                
                </section>

                <section className="nav-buttons-mobile logs-button">
                <MOBILE_NAV_BUTTONS 
                path={"/logs"} 
                label={ 
                    Logs
                }
                />

                </section>
            </div>
            </footer>
        </>
    )
}

export default Footer
