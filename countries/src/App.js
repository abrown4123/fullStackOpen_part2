import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {

  const [ searchTerm, setSearchTerm ] = useState("");
  const [ countries, setCountry ] = useState([]);
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const searchHook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log(response.data)
        setCountry(response.data);
      })
  }

  useEffect(searchHook, []);

  const countriesToShow = searchTerm
    ? countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries

  return (
   <div>
    find countries <input 
      value={searchTerm} 
      onChange={handleSearch} />
    <Countries countries={countriesToShow} />
   </div>
  );
}

export default App;
