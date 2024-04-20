import { useContext, useEffect } from "react"
import { MyContext } from "../MyContext"
import { useNavigate } from "react-router-dom"
function Logout(){
    const navigateTo = useNavigate()
    const{setLogin} = useContext(MyContext)

    localStorage.removeItem("accessToken")
    useEffect(()=>{
        setLogin({login:false, name:""})
        navigateTo("/")


    },[])


        
   
}

export default Logout