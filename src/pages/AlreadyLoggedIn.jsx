import { useContext } from "react"
import { MyContext } from "../MyContext"
import { NavLink } from "react-router-dom"
import Header from "../component/header"
function AlreadyLoggedIn(){
    const {login} = useContext(MyContext)

    return(
        <>
            <Header />
            <div className = "login-page">
                <h2 className = "login-tetx">Already Loged In</h2>
                <p>Use the link below to go to dashboard</p>
                <NavLink to = "/dashborad" ><button type="submit" className="submit-button">Go to Dashboard</button></NavLink>
            </div>
        </>
    )
}

export default AlreadyLoggedIn