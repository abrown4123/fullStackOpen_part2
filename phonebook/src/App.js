import React, { useState } from 'react'
import People from './components/People'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const checkName = person => person.name === newName;
  
  const handleSubmit = event => {
    event.preventDefault();

    const alreadyExists = persons.find(checkName)
    if (alreadyExists) {
      setNewName('');
      return alert(`${newName} already exists`);
    }

    const newEntry = {
      name: newName
    }
    setPersons(persons.concat(newEntry));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <People key={person.name} name={person.name} />
      )}
    </div>
  )
}

export default App;