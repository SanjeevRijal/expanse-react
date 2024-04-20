import { NavLink } from "react-router-dom"


function Nav(){
    const style = NavLink.isActive?"active":""

    return(
        <>
        <ul className="nav-menu">
        <li><NavLink to="/dashborad" 
            className={`nav-text ${style}` } ><i className='fas fa-table'></i>Dashboard
            </NavLink>
        </li>
        <li><NavLink to ="/addbill"
            className={`nav-text ${style}` }><i className='fas fa-file-invoice'></i>Add Bill
            </NavLink>
        </li>
        <li><NavLink to = "/allbill"
            className={`nav-text ${style}` }><i className='fas fa-bullseye'> </i>View Bill
             </NavLink>
        </li>
        <li><NavLink to = "/logout" 
            className={`nav-text  ${style}` }><i className='fas fa-sign-out-alt'></i>Log Out
            </NavLink>
        </li>

       
        </ul>


        </>

    )
}
export default Nav