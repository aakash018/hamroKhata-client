import "./style.css"

const Header:React.FC = () => {
    return (
        <div className="page-header">
            <span>HamroKhata</span>
            <section className="header-nav-buttons">
                <ul>
                    <li>Home</li>
                    <li>Logs</li>
                    <li>Audit</li>
                </ul>
            </section>
        </div>
    )
}

export default Header
