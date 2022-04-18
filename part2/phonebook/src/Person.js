import React from 'react'

const Person = ({ person }) => {
  return (
    <div>
      <li key = {person.id}>{person.name} {person.number}</li>
      
    </div>
    
  )
}

export default Person
