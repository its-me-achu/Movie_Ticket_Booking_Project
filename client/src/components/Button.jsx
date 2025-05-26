import React from 'react'

  function Button({title, onClick, disabled, type}) {
    
  return (
   <button 
   className='bg-primary p-1 text-white w-full border border-primary mt-2'
   type={type}
   onClick={onClick}
   disabled ={disabled}
   >
    {title}
   </button>
  )
}

export default Button