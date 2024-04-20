function Bill (props){


    return(
        <div className = "transaction-item">
            <div className="catatory-date">
                <p className = "catagory">{props.catagory}</p> 
                {props.date && <p className ="added-date" >{props.date}</p>}
            </div>

            {props.spenderName &&
            <div className="spender-name">
                <p>{props.spenderName}</p>
            </div>
            
            }

            <div className="total--update">
                <p className = "total">${props.amount}</p>
                {props.handelClick && <button className="button-update" onClick={()=>props.handelClick(props.bill_id)}><i className='fas fa-trash-alt'></i></button>}
            
            </div>
    
        </div>
    )

    }

export default Bill