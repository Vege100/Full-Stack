const OneCountry = ({country, weather}) => {
  console.log(weather)
  console.log(weather.current)
  const weatherData = weather.current
  console.log(weatherData)
  const temperature = Math.round((weatherData.temp - 273.15)* 100) / 100
    return (
        <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <div>
          {Object.keys(country.languages).map(language => (
            <ul key={language}>
              <li>{country.languages[language]}</li>
            </ul>
          ))}
        </div>
        <img src={country.flags.png} alt="Flag" />
        <h2>Weather in {country.capital}</h2>
        {weatherData && (
        <div>
          <p>Temperature in Celsius: {temperature}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
          <p>Wind {weatherData.wind_speed} m/s</p>
        </div>
      )}
      </div>
    )
}

export default OneCountry