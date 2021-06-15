import React from 'react';

const Country = ({ country }) => {
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
    </>
  )
}

export default Country;