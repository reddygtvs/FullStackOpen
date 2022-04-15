

import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])
 

  const hook = () => {
    console.log('effect') 
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])
  
  const filtered =
    countries.filter(country => {
    return(country.name.common.toLowerCase().includes(search.toLowerCase()))
  })

  const output = () => {
    if(filtered.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      ) 
    } else if (filtered.length > 1 && filtered.length <= 10) {
      return(
        filtered.map((country) => {
        return (
          <p key = {country.name.common}>
            {country.name.common}
          </p>
        )
      }))
    } else if (filtered.length === 1) {
        return (
          <Country country={filtered[0]}/>
        )
    }
  }


    


  return (
    <div className="App">
      <div>
        find countries <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div>
        {output()}
      </div>
      

    </div>
  )
}
export default App;
