import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="positiveMessage">
      {message}
    </div>
  )
}

export default Notification;