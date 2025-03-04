import React from 'react'

const ErrorMessage = ({content}) => {
  return (
    <div className="error-container">
          <p
            className='error-message'
            >
            {content}
          </p>
        </div>
  )
}

export default ErrorMessage