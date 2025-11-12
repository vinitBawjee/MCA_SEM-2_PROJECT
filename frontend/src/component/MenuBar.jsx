import '../component/MenuBar.css'

function MenuBar({ closeMenu }) {
    return (
        <div className="menuBar slideUp">
            <div className="top">
                <div className="close">
                    <i className="fa-solid fa-xmark" onClick={closeMenu}></i> 
                </div>
                <div className="navigationBar">
                    <p>AstaGuru</p>
                    <div className="row">Auctions</div>
                    <div className="row">Departments</div>
                    <div className="row">Services</div>
                    <div className="row">About US</div>
                </div>
            </div>
            <div className="bottom">
                <button>Signup</button>
                <button>Login</button>
            </div>
        </div>
    )
}

export default MenuBar;