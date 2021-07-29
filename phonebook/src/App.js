import React, { useEffect, useState } from 'react'
import People from './components/People'
import Search from './components/Search'
import AddPerson from './components/AddPerson'
import numberService from './services/numbers'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  
  const checkName = person => person.name === newName;
  const duplicatePeople = persons.find(checkName);
  const peopleToShow = searchName 
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons

  const hook = () => {
    numberService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers);
      })
  }

  useEffect(hook, []);

  const deleteNumber = id => {
    if (window.confirm("Are you sure you would like to delete this number?")){
      numberService
        .removeNumber(id)
        .then(response=> {
          console.log(response, "has been removed from db");
          setPersons(persons.filter(person => person.id !== id));
        })
    }
  }

  
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

    numberService
      .create(newEntry)
      .then(returnedNumber => {
        setPersons(persons.concat(returnedNumber));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log("Number creation failed")
      })
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
        <People 
          key={person.id}
          name={person.name} 
          number={person.number} 
          remove={() => deleteNumber(person.id)}/>
      )}
    </div>
  )
}

export default App;