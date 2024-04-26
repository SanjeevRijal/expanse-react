
import Nav from "../component/Nav.jsx"
import MyBill from "../component/MyBill.jsx"
import Header from "../component/header.jsx"
import DashBoardMid from "../component/dashBoardMiddle.jsx"
import { MyContext } from "../MyContext.jsx"
import NoLogIn from "./NoLogIn.jsx"
import { useContext } from "react"


function DashBoard() {
  const{login}= useContext(MyContext)

  return (
    <>

    < Header />
    {login.login?

    <div className="contianer">

      <div className="nav mobile-nav">
        < Nav />
      </div>
        
      <div className="main">
        <DashBoardMid  />
      </div>

      <div className="expense">
        < MyBill  />
      </div>

    </div>:<NoLogIn />
    
}
    </>
    
  )
}

export default DashBoard
