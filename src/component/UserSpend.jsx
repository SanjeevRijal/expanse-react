
function UserSpend(props){

    const style = {
        color:props.amount<0?"red":"green"
    }


    return(
        <div className="middle-Name-item">
                    <p className="spender--name"><i className='fas fa-circle' style = {style}></i>{props.name}</p>
                    <p className ="money-spend">${Math.abs(props.amount)}</p>
        </div>
    )

}

export default UserSpend