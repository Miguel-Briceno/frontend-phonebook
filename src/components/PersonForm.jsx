
const PersonForm = ({submit, newName, handlePersonChange, newNumber, handleNumberChange})=>{
    return(
        <form onSubmit={submit}>
        <div>
            name: <input                   
                value={newName}
                onChange={handlePersonChange}
            />                
        </div>
        <div>
            number: <input      
                        onChange={handleNumberChange}
                        value={newNumber}
                    />                
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm
