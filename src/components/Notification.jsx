const Notification = ({ message, error})=>{
    if (message === null && error === null) {
        return null;
    }
    const notificationStyle = {
        color: error !== null ? 'red': 'green',
        background: 'lightgrey',    
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10        
    };

    return(
        <div style={notificationStyle}>
            <p>{message || error} </p>
        </div>
    )
}

export default Notification;