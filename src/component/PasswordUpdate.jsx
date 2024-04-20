import { useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import Header from "./header";
function UpdatePassword (){

    const {token} = useParams()

    const [successMessage, setSuccessMessage] = useState()

    const [formData, setFormData] = useState({
        password:"",
        conformPassword:"",
    })
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
       
        if (formData.password.trim() === "") {
            newErrors.password = "Password is required";
        }else if
         (!formData.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
            newErrors.password = "One capital letter, one number and symbol is most";
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

    axios.post('https://expense-management-dvcv.onrender.com/conform_token', {"token":token})
    .then(response => {
        if (response.status === 200) {
            setFormData({
                password: "",
                conformPassword: "",
            })

            axios.post("https://expense-management-dvcv.onrender.com/update_password" ,{"formData":formData, "token":token})
            .then(response =>{
                if (response.status===200){
                    setSuccessMessage(response.data.message)
                }

            })
            .catch(error=>{
                setSuccessMessage("Something went wrong. Try again")
            })
              
        }
    })
    .catch(error=>{
        if(error.response.status === 400){
            setFormData({
                password: formData.password,
                conformPassword: formData.conformPassword,
            })
        }else{
            console.log(error)
        }

    })
    
    }
    return(
        <>
        < Header />
        <div className = "login-page">

            {successMessage && 
            <>
            <h2>Password Change Conformed</h2>
            <p> Your password has been changed successfully</p>
            <p> To login, click below:</p>
            <NavLink to = "/" ><button type="submit" className="submit-button">Login</button></NavLink>

            
            </>}

            { !successMessage &&
            <>
            <h2 className = "login-tetx">Change Password
            </h2>
            <p>Change you password now.</p>
            <form noValidate onSubmit={handleSubmit}>
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
                

                <button type="submit" className="submit-button">Submit</button>
            </form> 
            </>
            }
        
        </div>
    </>
    )
}


export default UpdatePassword