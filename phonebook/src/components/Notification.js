import React from 'react';

const Notification = ({ message, context }) => {
  let style = context ? "positiveMessage" : "negativeMessage"; 

  if (message === null) {
    return null
  }

  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification;