import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSpend from "./UserSpend.jsx";
import { nanoid } from 'nanoid';
import Chart from "./Chart.jsx";
import { useNavigate } from "react-router-dom";




function Middle() {
    const navigateTo = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const [usersSpend, setUserSpend] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/payment_details",{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          } )
            .then((response) => {
                setUserSpend(response.data);
            })
            .catch((error) => {
                console.error(error);
                navigateTo("/logout")
                
            })
    }, []);

    return (
        <div className="main-middle">
            <div className="top-main">
                
                    {usersSpend.map((each) => (
                        <UserSpend
                            name={each.name}
                            amount={each.amount}
                            key={nanoid()}
                        />
                    ))}
                
            </div>
            <div className="graph"><Chart /></div>
        </div>
    );
}

export default Middle;
