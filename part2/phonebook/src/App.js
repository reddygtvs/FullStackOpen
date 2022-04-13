import React, { useState, useEffect } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const fet = () => {
    console.log('start')
      axios.get('http://localhost:3001/persons').then(response => {
        console.log('fulfilled')
        console.log(response.data)
        setPersons(response.data)
      })
  }

  useEffect(fet, [])

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