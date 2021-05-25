import React from 'react'

const Search = ({ searchName, handleSearch }) => {
    return (
        <>
        <h3>Search</h3>
        <div>
            search: <input
            value={searchName}
            onChange={handleSearch}
            />
        </div>
        </>
    )
}

export default Search;