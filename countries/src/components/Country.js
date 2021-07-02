import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  const weatherHook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`)
      .then( response => {
        console.log(response.data)
        setWeatherInfo(response.data)
      })
  }

  //could've likely alleviated this by just breaking weather into its own component
  let weatherBlock = Object.keys(weatherInfo).length ? 
    <div>
      <p><strong>temperature:</strong> {Math.round(weatherInfo.main.temp)} Celsius</p>
      <br/>
      <img src="#" alt={weatherInfo.weather[0].main} width="500" height="600"/>
      <br/>
      <p><strong>wind:</strong> {weatherInfo.wind.speed} M/s</p> 
    </div>
    :
    <p>Loading...</p>

  useEffect(weatherHook, []);

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name + country.population}>{language.name}</li>
        })}
      </ul>
      <img width="400px" src={country.flag} alt={country.name + "'s flag"}/>
      <h3>Weather in {country.capital}</h3>
      {weatherBlock}     
    </>
  )
}

export default Country;