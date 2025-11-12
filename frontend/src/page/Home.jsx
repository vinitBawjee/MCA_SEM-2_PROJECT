import { useState } from "react"; 
import MenuBar from "../component/MenuBar"
import '../page/Home.css'

function HomePage() {
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        setShowMenu(true)
    }
    const closeMenu = () => {
        setShowMenu(false);
    }

    return (
        <div className="homePage">
            <div className="navBar">
                <div className="logo"> <p>AstaGuru</p> </div>
                <div className="rightMenu">
                    <div className="navigationBar">
                        <p>AUCTIONS</p>
                        <p>DEPARTMENTS</p>
                        <p>SERVICES</p>
                        <p>ABOUT US</p>
                        <p>LOGIN</p>
                    </div>
                    {/* <div className="dropdown">
                        <p></p>
                    </div> */}
                    <div className="rightBtn">
                        <div className="searchBar">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="menu">
                            <i className="fa-solid fa-bars" onClick={openMenu}></i>
                        </div>
                    </div>
                </div>
            </div>

            {showMenu && <MenuBar closeMenu={closeMenu}/>}
        </div>
    )
}

export default HomePage