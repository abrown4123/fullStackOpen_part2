import React from 'react'

const People = (props) => {
  return (
    <div>
      <p style={{display:"inline-block", padding: ".5em", margin: 0}}>{props.name}: {props.number}</p>
      <button onClick={props.remove}>delete</button>
    </div>
  )
}

export default People