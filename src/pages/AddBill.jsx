
import AddBillForm from "../component/add_bill_form.jsx"
import MyBill from "../component/MyBill.jsx"
import Header from "../component/header.jsx"
import Nav from "../component/Nav.jsx"
import { MyContext } from "../MyContext.jsx"
import { useContext } from "react"
import NoLogIn from "./NoLogIn.jsx"

function AddBill() {
  const{login}= useContext(MyContext)

  return (
    <>
    
      <Header />
      {login.login?


      <div className="contianer">

        <div className="nav">
          < Nav />
        </div>

        <div className="main">
          < AddBillForm />
        </div>

        <div className="expense">
          < MyBill />
        </div>

      </div>:<NoLogIn />
}
    
  

  </>
  
)}
    


export default AddBill
