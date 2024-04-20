
import Nav from "../component/Nav.jsx"
import MyBill from "../component/MyBill.jsx"
import Header from "../component/header.jsx"
import AllBills from "../component/all_bill.jsx"
import NoLogIn from "./NoLogIn.jsx"
import { useContext } from "react"
import { MyContext } from "../MyContext.jsx"

function AddBill() {
  const {login} = useContext(MyContext)

  return (
    <>
    < Header />
    {login.login?

    <div className="contianer">

      <div className="nav">
        < Nav />
      </div>

      <div className="main">
        
        <AllBills />
       
      </div>

      <div className="expense">
        < MyBill />
      </div>

    </div>:< NoLogIn />
}
    </>
  )
}

export default AddBill
