import { useState } from "react";
import axios  from "axios";
import Header from "./header";
import { NavLink } from "react-router-dom";

function ResetPassword(){
    let emailError = ""

    const [resetResponse, setResetResponse] = useState()


    const [formData, setFormData] = useState({

        email: ""
    });

    const [errors, setErrors] = useState();

    const [loginError, setloginError] = useState();

    function handleChange(event) {
        const { name, value } = event.target;

        
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        
        event.preventDefault();

        // Form validation

        if (formData.email.trim() === "") {
            emailError = "Email is required";
            setErrors(emailError)
            return
        }else if
        (!formData.email.match(/^\S+@\S+\.\S+$/)){
            emailError = "Email is not valid"
            setErrors(emailError)
            return
        }
        axios.post('https://expense-management-4m4u.onrender.com/validate_email', 
            formData
          )
          .then((response)=> {
            if(response.status===200){
                setFormData({
                    email: "", 
                })
                setErrors("")
                setloginError("")
                setResetResponse(response.data)
            }
          })
          .catch(error => {
                setloginError("Invalid user name")
                setErrors("")
          });
        }

    return(
        <>
        <Header />

        <div className = "login-page">
        {resetResponse && <div className="reset-instruction_send"> 
            <>
            <h2> Instruction Sent.</h2> <br />
            <p>Details instruction how to change password has been send to your email.</p> <br />
            <p>Please note that the link will expire within one hour.</p>
            <NavLink to = "/" ><button type="submit" className="submit-button">Login</button></NavLink>
            
            </>
            
            </div>}
        {!resetResponse && 
            <>
            <h2 className = "login-tetx">Password Reset
            </h2>
            <p>Provide you email to change a password</p>
        <form noValidate onSubmit={handleSubmit} className="resetForm">
        
            <label htmlFor="email" className="formLabel">User Name</label>
            <input
                type="text"
                name="email"
                className="input-field"
                onChange={handleChange}
                value={formData.email}
            /> 
            {errors && <span className="error">{errors}</span>}
            {loginError && <span className="error">{loginError}</span>}
            <button type="submit" className="submit-button">Submit</button> 
        </form>
        </>
        }
    </div>
    </>
    )
}

export default ResetPassword