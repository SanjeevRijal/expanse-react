import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "../component/header";
import { MyContext } from "../MyContext";
import AlreadyLoggedIn from "./AlreadyLoggedIn";

function Register (){
    const {login} = useContext(MyContext)

    const navigateTo = useNavigate()


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password:"",
        conformPassword:"",
    })

    const [responseData, setResponseData] = useState(null);



    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;

        // Validation
        const newErrors = { ...errors };
        if (value.trim() === "") {
            newErrors[name] = "This field is required";
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);

        // Update form data
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        
        event.preventDefault();

        // Form validation
        const newErrors = {};

        if (formData.name.trim() === "") {
            newErrors.name = "Name is required";
        }

        if (formData.email.trim() === "") {
            newErrors.email = "Email is required";
        }else if
        (!formData.email.match(/^\S+@\S+\.\S+$/)){
            newErrors.email = "Email is not valid"
        }

        if (formData.password.trim() === "") {
            newErrors.password = "Password is required";
        }else if
         (!formData.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
            newErrors.password = "Password requirenment show be met.";
        }

        if (formData.conformPassword.trim() === "") {
            newErrors.conformPassword = "Conform password is required";
        }else if (formData.conformPassword != formData.password){
            newErrors.conformPassword = "Password must match."
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

    axios.post('http://127.0.0.1:5000/register', formData)
    .then(response => {
        if (response.status == 200) {
            setResponseData("User Registration Successfull")
            setFormData({
                name: "",
                email: "",
                password: "",
                conformPassword: "",
            })
            navigateTo("/")  
        }
    })
    .catch(error=>{
        if(error.response.status == 409){
            setResponseData("User already existed. Use new email") 
            setFormData({
                name: formData.name,
                email: "",
                password: formData.password,
                conformPassword: formData.conformPassword,
            })
        }else{
            console.log(error)
        }

    })
    
    }
            
  
    return (
        <>
        {!login.login?
        <>
            <Header />

            <div className = "login-page">
            <h2 className = "login-tetx">Register
            </h2>
            <p>Please, fill the the details to access the protal.</p>
            <form noValidate onSubmit={handleSubmit}>
            {responseData && <span className="error">{responseData}</span>}
            <label htmlFor="name" className="formLabel">Name</label>
                
                <input
                    type="text"
                    name="name"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.name}
                />
               
                {errors.name && <span className="error">{errors.name}</span>}
                

                <label htmlFor="email" className="formLabel">Email</label>
                
                <input
                    type="text"
                    name="email"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.email}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                

                <label htmlFor="password" className="formLabel">Password</label>
                
                <input
                    type="password"
                    name="password"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                

                <label htmlFor="conformPassword" className="formLabel">Conform Password</label>
                
                <input
                    type="password"
                    name="conformPassword"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.conformPassword}
                />
                {errors.conformPassword && <span className="error">{errors.conformPassword}</span>}
                

                <button type="submit" className="submit-button">Register</button>

            </form>
            <NavLink to= "/" className="sign-up-link">Log In
            </NavLink>

            

            </div></>: 
            <AlreadyLoggedIn />
            }


        
        </>
    )
  
}

export default Register