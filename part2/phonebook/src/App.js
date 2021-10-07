import React, { useState } from 'react'

const App = () => {
  // const [ persons, setPersons ] = useState([
  //   { name: 'Arto Hellas', id: 'Arto Hellas', number:69696969 }
  // ]) 
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

    setPersons(persons.concat(noteObject))
    console.log(persons)
  }
  // setPersons(() => persons.filter(el => el.name.toLowerCase().indexOf(filterName.toLowerCase !== -1)))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input value={filterName}
          onChange={handleFilterChange} />
        </div>
      </form>
      <h2>Add a new member</h2>
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
        
        {/* {filterItems(persons, filterName)} */}
        {filterItems.map(person => {
          return (
            <li key={person.name}>{person.name} {person.number}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default App