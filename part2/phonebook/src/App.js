import React, { useState, useEffect } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import Filter from './Filter'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [tip, setTip ] = useState('confirm')
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const fet = () => {
    console.log('start')
      personService.getAll().then(response => {
        console.log('fulfilled')
        // console.log(response)
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
      const note = persons.find(person => person.name === noteObject.name)
      if (window.confirm(`${noteObject.name} is already added to phonebook. Do you want to update the number?`)) {
        personService.update(note.id, noteObject).then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== response.id? person : response))
          setMessage(`Number for ${note.name} has been updated`)
          setTip('confirm')
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }

      return
    }
   personService.create(noteObject).then(response => {
      
      console.log(response)
      setPersons(persons.concat(response))
      setMessage(`${response.name} has been added`)
      setTip('confirm')
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    

    // setPersons(persons.concat(noteObject))
    
  }
  const removeEntry = (id, nameCurrent) => {
    if (window.confirm(`Do you really want to delete ${nameCurrent}?`)) {
      personService.remove(id).then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
        console.log(setPersons)
        setMessage(`${nameCurrent} has been removed from the server`)
        setTip('confirm')
        setTimeout(() => {
        setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`${nameCurrent} has already been removed from the server`)
          setTip('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} tip={tip}/>
      {<Filter filterName={filterName} handleFilterChange={handleFilterChange} />}

      <h2>Add a new member</h2>
      {<PersonForm addNote={addNote} newName={newName} 
      newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}/>}
      
      {/* <div>debug: {newName}</div> */}
      <h1>Numbers</h1>
      
        {filterItems.map(person =>
           
              <div>
                <Person person={person} />
                <button onClick={() => removeEntry(person.id, person.name)}>delete</button>
              </div>
            
            )}
    </div>
  )
}

export default App