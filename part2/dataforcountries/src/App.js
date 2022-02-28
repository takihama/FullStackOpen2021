import { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const handleFilter = event => setFilterText(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      find countries <input value={filterText} onChange={handleFilter} />
      <ListCountries countries={countries} filterText={filterText} />
    </div>
  );
}

const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => setShowDetails(!showDetails)

  if (showDetails) {
    return (
      <li>
        {country.name} <Button onClick={() => handleShowDetails()} text='hide' />
        <CountryDetails country={country} />
      </li>
    )
  }
  else {
    return (
      <li>
        {country.name} <Button onClick={() => handleShowDetails()} text='show' />
      </li>
    )
  }
}

const CountryDetails = ({ country }) => {
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [cityWeather, setCityWeather] = useState({ cod: 404 })
  const weatherIcon = cityWeather.cod !== 404 ? `http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png` : null

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${weather_api_key}`)
      .then(response => setCityWeather(response.data))
  }, [country.capital, weather_api_key])

  return <div>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>area: {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt='' width='150px' />
    <h2>Weather in {country.capital}</h2>
    <p>temperature {cityWeather.cod !== 404 ? cityWeather.main.temp : '*'} Celsius</p>
    <img src={weatherIcon} alt='' />
    <p>wind {cityWeather.cod !== 404 ? `${cityWeather.wind.speed} m/s` : '*'}</p>
  </div>
}

const ListCountries = ({ countries, filterText }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filterText.toLowerCase()))
  if (filteredCountries.length === 0) {
    return <p>There is no matching country</p>
  }
  else if (filteredCountries.length > 10 && filterText !== '') {
    return <p>Too many matches, specify another filter</p>
  }
  else if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />
  }
  else {
    return filteredCountries.map(country => <Country key={country.numericCode} country={country} />)
  }
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

export default App;