import React from 'react'


const ErrorMessage = ({message}) => {
  return (
    <div className='bg-red 100 text-red-700 px-4 py-2 rounded my-2'>
        {message || "something went wrong"}
    </div>
  )
}

export default ErrorMessage;

