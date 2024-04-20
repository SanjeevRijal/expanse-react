import { NavLink } from "react-router-dom"


function NoLogIn(){
    return(
        <>
       
        <div className = "login-page">
            <h2 className = "login-tetx">Not Logged In.
            </h2>
            <p> You ned to login first to access this page.</p>
            <p> Use button below to login</p>
            <NavLink to = "/" ><button type="submit" className="submit-button">Login</button></NavLink>

            
        </div>
        </>
    )
}

export default NoLogIn