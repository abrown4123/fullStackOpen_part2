import React, { useState } from 'react'
import People from './components/People'
import Search from './components/Search'
import AddPerson from './components/AddPerson'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "123-1231" }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  
  const checkName = person => person.name === newName;
  const duplicatePeople = persons.find(checkName);
  const peopleToShow = searchName 
  ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  : persons
  
  const handleSubmit = event => {
    event.preventDefault();

    if (duplicatePeople) {
      setNewName('');
      return alert(`${newName} already exists`);
    }

    const newEntry = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newEntry));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleSearch = event => {
    setSearchName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchName={searchName} handleSearch={handleSearch} />
      <AddPerson 
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {peopleToShow.map(person => 
        <People key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App;