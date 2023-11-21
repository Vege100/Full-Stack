import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import OneCountry from './components/OneCountry'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [showClarification, setShowClarification] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null) 
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY


  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {
        setCountries(response.data)
        setAllCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const capitalInfo = selectedCountry.capitalInfo
      if (capitalInfo && capitalInfo.latlng && capitalInfo.latlng.length === 2) {
        const [lat, lon] = capitalInfo.latlng
        console.log(lat,lon)
        axios
          .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
          })
          .catch(error => {
            console.error('Error fetching weather:', error)
          })
      }
    }
  }, [selectedCountry])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null) 
  }

  const handleSelectCountry = (country) => {
      setSelectedCountry(country)
  }


  useEffect(() => {
    if (value === '') {
      setCountries(allCountries)
      setShowClarification(true)
    } else {
      const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
      if (filteredCountries.length > 10) {
        setShowClarification(true)
        setCountries([])
      } else {
        setShowClarification(false)
        setCountries(filteredCountries)
        if (filteredCountries.length === 1) {
          setSelectedCountry(filteredCountries[0]) 
        }
      }
    }
  }, [value, allCountries])

  return (
    <div>
      <form>
        Country: <input value={value} onChange={handleChange} />
      </form>
      {showClarification && <p>Too many matches, specify another filter</p>}
      {!showClarification && !selectedCountry && countries.length <= 10 && (
        <Countries countries={countries} handleSelectCountry={handleSelectCountry}/>
      )}
      {selectedCountry && weather && ( 
      <OneCountry country={selectedCountry} weather={weather}/>
      )}
    </div>
  )
}

export default App
