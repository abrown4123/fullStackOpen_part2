import React from 'react'

const AddPerson = (props) => {
    return (
        <>
        <h3>add a new</h3>
        <form onSubmit={props.handleSubmit}>
            <div>
            name: <input 
                value={props.newName}
                onChange={props.handleNameChange}
            />
            number: <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default AddPerson