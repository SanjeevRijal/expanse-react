import axios from "axios";
import {useState,useEffect} from "react"
import { nanoid } from "nanoid";
import CheckBox from "./checkBox.jsx"
import { useNavigate } from "react-router-dom";


function AddBill (){
    const navigateTo = useNavigate()
    const accessToken = localStorage.getItem("accessToken")

    const[resetCheckBox, setReestCheckBox] = useState(false)

    const [formData, setFormData] = useState(
        {
            billType: "", 
            amount: "",  
            
        }
    )


    const [checkBox, setCheckBox] = useState([])

    const userCheckBox = checkBox.map(each=> {
        const id = nanoid()
        return < CheckBox username = {each.name}
            id = {each.userId}
            key = {id}
            handelClick = {handleChangeCheckBox}
            checkBoxValue ={each["shareWith" + each.name]}
                    
        />
    })



    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleChangeCheckBox(id, checked, name){
        const updatedCheckBox = checkBox.map(item => {
                if (item.userId === id) {
                  return { ...item, [name]:checked };
                }
                return item;
              });
        setCheckBox(updatedCheckBox) 
            
    }


    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/add_bill', {
            formData, checkBox
          },{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response)=> {
            if(response.status===200){
                setFormData({
                    billType: "", 
                    amount: "",  
                
                })

                navigateTo("/dashborad")

            }

            setReestCheckBox(prevdata =>!prevdata)
            
          })
          .catch(error => {
            console.log(error);
            navigateTo("/logout")
          });
        }


    

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        .then((response)=>{
            const checkBoxData = response.data.user
            setCheckBox(response.data.user)
        })
        .catch((error)=>{
            if(error){
        setCheckBox([error ])}
        navigateTo("/logout")
        
        })

    },[resetCheckBox])

    return(
        <div className = "form-class">
            <h2 className="form-text"> Fill in the form to add new bills</h2>
            <form  onSubmit={handleSubmit} >
                <label htmlFor="billType" className="formLabel">Catagory</label>
                
                <input
                    type="text"
                    name="billType"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.billType}

                />
                

                <label htmlFor="amount" className="formLabel">Amount</label>
                
                <input
                    type="number"
                    name="amount"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.amount}

                />

                <fieldset>

                    <label className = "legend">Share With:</label>
                    {userCheckBox}

                </fieldset>

                <button className="submit-button">Submit</button>

            </form> 
            
        </div>


    )
}

export default AddBill