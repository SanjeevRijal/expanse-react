import {Routes, Route} from "react-router-dom"
import AddBill from "./pages/AddBill.jsx"
import AllBill from "./pages/AllBill.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DashBoard from "./pages/Dashboard.jsx"
import Logout from "./pages/Logout.jsx"
import ResetPassword from "./component/ResetPassword.jsx"
import './App.css'
import UpdatePassword from "./component/PasswordUpdate.jsx"
import LoginContextProvider from "./component/LoginContextProvider.jsx"
import NotFound from "./pages/NotFound.jsx"
import { ErrorBoundary } from "./pages/ErrorBoundry.jsx"


function App() {


  return (
    <>
    <ErrorBoundary>
    <LoginContextProvider>
    <Routes>
      <Route path="/" element = {< Login/>}/>
      <Route path = "/reset_password" element = {<ResetPassword />}/>
      <Route path="/password_update/:token" element={<UpdatePassword />} />
      <Route path = "/register" element = {<Register />} />
    <Route path = "/addbill" element = {<AddBill />} />
    <Route path = "/allbill" element = {<AllBill />} />
    <Route path = "/dashborad" element = {<DashBoard />}/>
    <Route path = "/logout" element = {<Logout />}/>
    <Route path="*" element={<NotFound />} />
    </Routes>
    </LoginContextProvider>
    </ErrorBoundary>

  </>
    
  )
}

export default App
