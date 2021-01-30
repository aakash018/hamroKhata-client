import "./style.css"
import { Link } from "react-router-dom"
const Header:React.FC = () => {
    return (
        <div className="page-header">
            <span>HamroKhata</span>
            <section className="header-nav-buttons">
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/logs">Logs</Link></li>
                    <li><Link to="/audit">Audit</Link></li>
                </ul>
            </section>
        </div>
    )
}

export default Header
