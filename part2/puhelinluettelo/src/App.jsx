import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('notification-green')

  useEffect(() => {
    personsService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()

    if (newName === '') return

    const existingPerson = persons.find((person) => person.name === newName)

    if (!existingPerson) {
        personsService
        .create({ name: newName, number: newNumber }).then(createdPerson => {
          setPersons([...persons, createdPerson])
          showNotification(`Added ${newName}`)
          setNotificationColor('notification-green')
          setNewName('')
          setNumber('')
        })
        .catch(error => {
          console.error('Error adding person:', error.response.data)
          showNotification(`Error adding person: ${error.response.data.error}`)
          setNotificationColor('notification-red')
        })
    } else {
      const confirmed = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one`)

      if (confirmed) {   
        await personsService.update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(() =>  personsService.getAll())
        .then((updatedPersons) => {
          showNotification(`${existingPerson.name}'s phonenumber changed to ${newNumber}`)
          setNotificationColor('notification-green')
          setPersons(updatedPersons)
          setNumber('')
          setNewName('')
        })
        .catch((error) => {
          console.error('Error changing number:', error)
          showNotification('Error changing number:', error.response.data)
          setNotificationColor('notification-red')
        })
      }
    }
  
    console.log('persons:', persons)
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const showNotification = (message) => {
    setNotification(message
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    personsService.getAll()
    .then((updatedPersons) => {
      setPersons(updatedPersons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    })
  }
  

  const removePerson = (personToRemove) => {
    const confirmed = window.confirm(`Delete ${personToRemove.name}?`)
    
    if (confirmed) {
      personsService.remove(personToRemove.id)
        .then(() =>  personsService.getAll())
        .then((updatedPersons) => {
          showNotification(`removed ${personToRemove.name}`)
          setNotificationColor('notification-green')
          setPersons(updatedPersons)
          
        })
        .catch((error) => {
          console.error('Error removing person:', error)
          showNotification(`Error removing person: ${personToRemove.name}`)
          setNotificationColor('notification-red')
        })
    }
  }
  
  
  
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor}></Notification>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={persons} removePerson={removePerson} />
    </div>
  )
}

export default App