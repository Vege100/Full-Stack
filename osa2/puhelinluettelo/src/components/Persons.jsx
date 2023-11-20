import React from 'react'
import Person from './Person' 

const Persons = ({ showPersons , removePerson}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {showPersons.map((person) => (
  <Person key={person.id} person={person} removePerson={() => removePerson(person)} />
))}

    </div>
  )
}

export default Persons

