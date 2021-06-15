import React from "react"
import Country from "./Country"

const Countries = (props) => {

  if (!props.countries.length) {
    return <div>Please search a country</div>
  }

  if (props.countries.length === 1) {
      return (
        <div>
          <Country country={props.countries[0]}/>
        </div>
      )
  }

  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
  <div>
    {props.countries.map(country =>
      <p key={country.callingCodes + country.name}>{country.name}</p>
    )}
  </div>
  )

}

  export default Countries;