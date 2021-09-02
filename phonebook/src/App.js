import React, { useEffect, useState } from 'react'
import People from './components/People'
import Search from './components/Search'
import AddPerson from './components/AddPerson'
import numberService from './services/numbers'
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ addedNotification, setAddedNotification ] = useState(null);
  const [ notificationContext, setNotificationContext] = useState(null);
  
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

  const deleteNumber = deletedPerson => {
    let {name, id} = deletedPerson;
    if (window.confirm("Are you sure you would like to delete this number?")){
      numberService
        .removeNumber(id)
        .then(response=> {
          console.log(response, "has been removed from db");
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          setAddedNotification(`Information of ${name} has already been removed from server`);
          setTimeout(() => {
            setAddedNotification(null);
          }, 5000)
        })
    }
  }

  const updateNumber = () => {
    if (window.confirm(`${duplicatePeople.name} already exists. Would you like to update their number?`)) {
      const id = duplicatePeople.id //creating this to not have to iterate duplicatePeople each time
      const changedNumber = { ...duplicatePeople, number: newNumber}

      numberService
        .update(id, changedNumber)
        .then(returnedNumber => {
          setPersons(persons.map(person => person.id !== id ? person : returnedNumber))
          setNewName('')
          setNewNumber('');
        })
    }
  }

  
  const handleSubmit = event => {
    event.preventDefault();

    if (duplicatePeople) {
      return updateNumber();
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
        setNotificationContext(true);
        setAddedNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotificationContext(null);
          setAddedNotification(null);
        }, 5000)
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
      <Notification message={addedNotification} context={notificationContext} />
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
          remove={() => deleteNumber(person)}/>
      )}
    </div>
  )
}

export default App;