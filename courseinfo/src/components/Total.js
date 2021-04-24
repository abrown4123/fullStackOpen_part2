import React, { useState } from 'react'

const Total = ({ parts }) => {
	let numberOfExercises = 0;
	parts.forEach(part => numberOfExercises += part.exercises);

  return (
		<p><b>Total of {numberOfExercises} exercises</b></p>
	) 
}


export default Total;