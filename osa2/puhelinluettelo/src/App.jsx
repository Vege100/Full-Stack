import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showPersons, setShowPersons] = useState(persons)

  useEffect(() => {
    
    personsService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
        setShowPersons(initialPerson)
      })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(newName, newNumber);
  
    if (!persons.some((person) => person.name === newName) && newName !== '') {
      try {
        const responsePerson = await personsService.create({ name: newName, number: newNumber });
        setPersons([...persons, responsePerson]);
        setShowPersons([...persons, responsePerson])
        setNewName('');
        setNumber('');
      } catch (error) {
        console.error('Error adding person:', error);
      }
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  
    console.log('persons:', persons);
  };
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    console.log(event.target.value)
    setShowPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const removePerson = (personToRemove) => {
    const confirmed = window.confirm(`Delete ${personToRemove.name}?`);
    
    if (confirmed) {
      personsService.remove(personToRemove.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToRemove.id));
          setShowPersons(showPersons.filter((person) => person.id !== personToRemove.id));
        })
        .catch((error) => {
          console.error('Error removing person:', error);
        });
    }
  };
  
  
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons showPersons={showPersons} removePerson={removePerson} />
    </div>
  )
}

export default App