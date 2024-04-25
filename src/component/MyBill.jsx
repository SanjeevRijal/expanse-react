import { useEffect,useState } from "react"
import  { nanoid } from"nanoid"
import Pagination from "./Pagination.jsx"
import Bill from "./IndividualBill.jsx"
import axios from "axios"

function MyBill(){
    const accessToken = localStorage.getItem('accessToken')

    const [bills, setBill] = useState([])

    const myAllBill = bills.map(bill=>{
        const id = nanoid()

        return(
            <Bill 
                key = {id}
                catagory={bill.catagory}
                
                amount = {bill.amount}
                bill_id = {bill.billId}
                handelClick = {handleclick}
            />
        )
    })

    function handleclick(bill_id){
        axios.post( "https://expense-management-4m4u.onrender.com/delete_bill",{
                bill_id
        },{headers: {
            Authorization: `Bearer ${accessToken}`
          }})
        .then((response)=> {
            if(response.status===200){
                setBill(bills.filter(bill=>bill.billId != bill_id))

            }
          })
          .catch(error => {
            console.log(error);
          });
        }



    useEffect(()=>{
        axios.get("https://expense-management-4m4u.onrender.com/my_bill", {headers: {
            Authorization: `Bearer ${accessToken}`
          }})
        .then(response=>{
            setBill(response.data.myBill)
        })
        .catch(error=>{
            console.log(error)
                
            })

    },[])

    return(
        <>
        <h4 className ="bill--head-text">Your Transcation History</h4>
        < Pagination itemsPerPage ={5}
            items = {myAllBill}
         />
        
        </>
    )

}

export default MyBill