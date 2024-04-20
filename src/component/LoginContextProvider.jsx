import { useState, useEffect } from "react";
import  {MyContext}  from "../MyContext";


function LoginContextProvider({children}){

    const storedLogin = ()=>{
        const loginData = localStorage.getItem("login")
        return loginData?JSON.parse(loginData):{login:false,
        name:""}

    }

    const [login, setLogin] = useState(storedLogin)

    useEffect (()=>{
        const controller = new AbortController()
        localStorage.setItem("login", JSON.stringify(login))

        return ()=>{
            controller.abort()
        }

    },[login])

    
    return (
        <MyContext.Provider value={{login, setLogin}}>
            {children}
        </MyContext.Provider>
    )
}

export default LoginContextProvider