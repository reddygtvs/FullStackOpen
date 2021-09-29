import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas', number:69696969 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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

    setPersons(persons.concat(noteObject))
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => {
          return (
            <li key={person.name}>{person.name} {person.number}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default App