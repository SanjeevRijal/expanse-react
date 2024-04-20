
import Header from "../component/header"
import React, { useState,useContext } from "react";
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { MyContext } from "../MyContext";
import AlreadyLoggedIn from "./AlreadyLoggedIn";

function Login() {
    const {login , setLogin} = useContext(MyContext)
    const [loginError, setloginError] = useState("")
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({

        userName: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;

    
        const newErrors = { ...errors };
        if (value.trim() === "") {
            newErrors[name] = "This field is required";
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);

        
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        if (formData.userName.trim() === "") {
            newErrors.userName = "User Name is required";
        }
        if (formData.password.trim() === "") {
            newErrors.password = "Password is required";
        }else if
         (!formData.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
            setloginError("Invalid email or password")
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://127.0.0.1:5000/login', 
            formData
          )
          .then((response)=> {
            if(response.status===200){
                setFormData({
                    userName: "", 
                    password: "",  
                
                })
                localStorage.setItem("accessToken", response.data.access_token)
                setLogin(prev =>{
                   return {...prev , 
                    login:!prev.login,
                    name:response.data.user_info.name}
                })
                navigateTo("/dashborad");
            }
          })
          .catch(error => {
                setloginError("Invalid email or password")
          });
        }

    return (
        <>
        {!login.login?
        <>
        <Header />
        <div className = "login-page">
            <h2 className = "login-tetx">Login 
            </h2>
            <form noValidate onSubmit={handleSubmit}>
            {loginError && <span className="error">{loginError}</span>}
                <label htmlFor="userName" className="formLabel">User Name</label>
                
                <input
                    type="text"
                    name="userName"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.userName}
                />
                {errors.userName && <span className="error">{errors.userName}</span>}
               
                <label htmlFor="password" className="formLabel">Password</label>
                
                <input
                    type="password"
                    name="password"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                

                <button type="submit" className="submit-button">Login</button> 

                <NavLink to = "/reset_password" className="reset-password"> Reset pasword
                    </NavLink>
            </form>

            <NavLink to= "/register" className="sign-up-link">SIgn Up
            </NavLink>
            </div> </>:
             <AlreadyLoggedIn />
        }
        </>
    );
}

export default Login;
