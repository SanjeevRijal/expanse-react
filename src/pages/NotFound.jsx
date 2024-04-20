import Header from "../component/header";
import { NavLink } from "react-router-dom";

function NotFound(){
    return(
        <>
            <Header />
            <div className = "login-page">
            <h2 className = "login-tetx">Page Not Found</h2>
            <p>Page doesn't exist.</p>
            <p>Click below to login. </p>
            <NavLink to = "/" ><button type="submit" className="submit-button">Login</button></NavLink>


            </div>

        </>
    )

}

export default NotFound