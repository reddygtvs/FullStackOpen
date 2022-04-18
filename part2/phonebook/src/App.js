import React, { useState, useEffect } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import Filter from './Filter'
import axios from 'axios'
import personService from './services/persons'

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
      personService.getAll().then(response => {
        console.log('fulfilled')
        console.log(response)
        setPersons(response)
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
      // id: newName,
      number: newNumber
    }
    
    if (persons.find(person => person.name === noteObject.name)) {
      window.alert(`${noteObject.name} is already added to phonebook`)
      return
    }
   personService.create(noteObject).then(response => {
      console.log(response)
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
    

    // setPersons(persons.concat(noteObject))
    
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