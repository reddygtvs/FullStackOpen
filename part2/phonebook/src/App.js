import React, { useState } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import Filter from './Filter'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filterName, setFilterName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const filterItems = persons.filter (
    person => {
      return (
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    
  }
  )
  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      name: newName,
      id: newName,
      number: newNumber
    }
    setNewName('')
    if (persons.find(person => person.name === noteObject.name)) {
      window.alert(`${noteObject.name} is already added to phonebook`)
      return
    }
    setNewNumber('')

    setPersons(persons.concat(noteObject))
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {<Filter filterName={filterName} handleFilterChange={handleFilterChange} />}
      <h2>Add a new member</h2>
      {<PersonForm addNote={addNote} newName={newName} 
      newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}/>}
      
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      <ul>
        {filterItems.map(person =>  <Person person={person} />)}
      </ul>
    </div>
  )
}

export default App