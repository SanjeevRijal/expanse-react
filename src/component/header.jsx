import { useContext,useState } from "react"
import { MyContext } from "../MyContext"
import MobileNav from "./Nav.jsx"

function Header(){
    const{login}= useContext(MyContext)
    const [mobileNav, setMobileNav] = useState(false)

    function handelClick(){
        setMobileNav(mobileNav=>!mobileNav)
    }
    return(
        <>
        <div className = "header">
            <div className = "logo">
            <h5 className = "logo-text"><i className='fas fa-receipt'></i>HouseBill</h5>
            <p className="mobile-welCome-text"> {login.name && `Welcome, ${ login.name}`}</p>
                
            </div>
            <div className ="user-info">
            <p className="desktop-welCome-text"> {login.name && `Welcome, ${ login.name}`}</p>
            {login.login && <button className="mobile-submit-button" onClick={handelClick}><i className='fas fa-bars'></i></button>}
            </div>
           
        </div>
        {mobileNav && <MobileNav mobileNav ={mobileNav} />}

        
        </>
    )
}

export default Header