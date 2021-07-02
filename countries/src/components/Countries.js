import React, { useState } from "react"
import Country from "./Country"

const Countries = (props) => {

  const [showState, setShowState] = useState({});
  const [toggleInfo, setToggleInfo] = useState(false);
  const handleClick = (name) => {
    showState[name] 
    ? setShowState({...showState, [name]: false}) 
    : setShowState({...showState, [name]: true})

    setToggleInfo(!toggleInfo)
  }

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
        <div key={country.callingCodes + country.name}>
          <p>{country.name}</p> 
          <button onClick={() => handleClick(country.name)}>show</button>
          { showState[country.name] &&
             <Country country={country}/>
          }
        </div>
      )}
    </div>
  )

}

  export default Countries;