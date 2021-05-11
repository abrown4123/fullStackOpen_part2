import React from 'react';
import Course from './components/Course';

const App = ({ courses }) => {
  return (
    <>
      {courses.map(course => 
        <Course id={course.id} course={course} />
      )}
    </>
  )
}

export default App;