import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from "./components/Persons.jsx";
import personService from './services/person.js'
import Notification from './components/Notification.jsx'

const App = () => { 
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')  
  const [newNumber, setNewNumber] = useState('')  
  const [search, setSearch] = useState('')  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(()=>{ 
      personService     
          .getAll()           
          .then(response=>setPersons(response));                                  
  },[])  
  
  const handleAddPerson = (event)=> {
    event.preventDefault();
    const personExist = persons.find((person)=> person.name.toLowerCase() === newName.trim().toLocaleLowerCase());
    if (personExist){
      const confirmUpdate = window.confirm(
        `${personExist.name} is already added to phonebook, replace old number with a new one?`
      );

      if (confirmUpdate){
        const updatePerson = {...personExist, number: newNumber}
        personService
          .update(personExist.id, updatePerson)
          .then(updateResponse =>{
            setPersons(prevPersons => 
              prevPersons.map(person => person.id === personExist.id ? updateResponse : person));           
            setNewName('');
            setNewNumber('');
            setMessage(`Number ${updateResponse.number} changed for ${updateResponse.name}`);
            setInterval(() => setMessage(null), 8000);            
          })
          .catch((error) => {            
            setError(`Information of ${personExist.name} has already been removed from server`);
            setInterval(() => setError(null), 10000);            
          });  
      }      
      return;
    }

    const personObject = {
      name: newName,      
      number: newNumber,
    };

    personService
          .create(personObject)
          .then(response => {            
            response
            setPersons(prevPersons => [...prevPersons, response]);    
            setNewName('');     
            setNewNumber('');
            setMessage(`Added ${response.name}`);
            setInterval(() => setMessage(null), 5000);             
          })       
  };


  const handlePersonChange = event => setNewName(event.target.value);  
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleSearchPerson = event => setSearch(event.target.value);
  const personToShow = search ? persons.filter(person=>person.name.toLowerCase().trim().includes(search.toLocaleLowerCase().trim())):[]; 
                              

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter  
        search={search} 
        handle={handleSearchPerson}
        personToShow={personToShow}
      />      
      <h2>Add a new</h2>
      <PersonForm 
        submit={handleAddPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}        
      />      
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>                 
    </div>
  )
}

export default App