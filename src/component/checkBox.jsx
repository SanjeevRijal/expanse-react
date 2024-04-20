
function CheckBox(props){
    const handleChange = (event) => {
        const{name, checked} = event.target
        props.handelClick(props.id, checked, name)
        
    }
    return(
        <>
        <input 
            type="checkbox" 
            name={"shareWith"+ props.username}
            className="checkbox-field"
            onChange={handleChange}
            checked = {props.checkBoxValue}

            />

            <label htmlFor="amount" className="formLabel">{props.username}</label>

            < br/>
        </>
    )}

export default CheckBox