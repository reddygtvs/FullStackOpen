


const Country = ( {country} ) => {

    const language = () => {
        const l = country.languages;
        
        const entries = Object.values(l)
        return (
                entries.map(languages => {
                        return (<ul>
                        <l1>{languages}</l1>
                        </ul>
                        )
                })
            
        )
        
        
    }

    return(
        <div>
            <p>You got your result:</p>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} </p>
            <h3>Languages:</h3>
            {language()}
            <img src={country.flags.png} />
            
        </div>
    )
}

export default Country;