const Countries = ({countries, handleSelectCountry}) => {
    return (
        <div>
            <h2>Country Names:</h2>
            <ul>
            {countries.map(country => (
                <li key={country.name.common}>{country.name.common}
                <button onClick={() => handleSelectCountry(country)}>Select</button></li>
                
            ))}
            </ul>
      </div>
    )
}

export default Countries