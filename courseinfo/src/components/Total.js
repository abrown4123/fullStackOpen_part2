import React, { useState } from 'react'

const Total = ({ parts }) => {
	let numberOfExercises = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}));

  return (
		<p><b>Total of {numberOfExercises.exercises} exercises</b></p>
	) 
}


export default Total;