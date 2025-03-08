import React from 'react'
import { FcComments } from "react-icons/fc";
const Button = () => {
  return (
    <div className='w-[10%] felx justify-center items-center p-1 bg-green-500'>
      <button type="button" className="flex items-center gap-2
       text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
       focus:ring-blue-300 font-medium rounded-[1rem] text-sm px-5 py-2.5 me-2  mb-2 
       dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
       dark:focus:ring-blue-800">
          Report    <FcComments />
       </button>
    </div>
  )
}

export default Button
