import personService from "../services/person";


const Persons = ({persons, setPersons}) => {
        const handleClickDelete = (id, name) =>{            
            if(window.confirm(`Delete ${name}?`)){
                personService
                    .erase(id)
                    .then(() =>{
                        console.log(prevPersons => prevPersons.filter(person => person.id !== id));
                        setPersons(
                            prevPersons => prevPersons.filter(person => person.id !== id)                           
                        );
                    })                   
            }
        }
        return(
            <div >
                {persons.map( person => {
                    return (
                        <div key={person.id}>
                            <span > {person.name} - {person.number} </span>
                            <button onClick={()=>handleClickDelete(person.id, person.name)} >delete</button>
                        </div>
                    )
                })}
            </div>

        )
    
}         


export default Persons;