import { useEffect,useState } from "react"
import  { nanoid } from"nanoid"
import Pagination from "./Pagination.jsx"
import Bill from "./IndividualBill.jsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function MyBill(){
    const navigateTo = useNavigate()

    const [bills, setBill] = useState([])

    const allBill = bills.map(bill=>{
        const id = nanoid()

        return(
            <Bill 
                key = {id}
                catagory={bill.catagory}
                date = {bill.spend_date}
                amount = {bill.amount}
                spenderName = {bill.spenderName}
            />
        )
    })


    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');
        axios.get("http://127.0.0.1:5000/all_bill", {headers: {
            Authorization: `Bearer ${accessToken}`
          }})
        .then(response=>{
            setBill(response.data.allBill)
        })
        .catch(error=>{
            console.log(error)
            navigateTo("/logout")
                
            })

    },[])

    return(
        <div className = "all_bill">
        <h4 className ="bill--head-text">All Bills</h4>
        < Pagination itemsPerPage ={5}
            items = {allBill}
         />
        
        </div >
    )

}

export default MyBill