"use client"
import React ,{ useState } from 'react'
import Button from '@/components/Button'
import Cardsl from '@/components/Cardsl'
import  Link  from 'next/link'

const FoundItems = () => {
  const [leftBrac, setLeftBrac] = useState('{');
  const [rightBrac, setRightBrac] = useState('}');
  return (
    <div className='w-[100%] h-[100%] p-2  bg-bgItems bg-repeat bg-cover'>
      {/* search bar */}
      <div className="w-full h-[4rem] flex justify-center items-center ">
        <h1 className="text-black text-[2rem] md:text-[3.5rem] font-[700] leading-[100%]">{leftBrac}  Found Items {rightBrac} </h1>
      </div>
      <div className="w-full h-[4rem] flex justify-center items-center p-2">
        <Link href='/searchlost'>
              <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Search
            </button>
        </Link>
         
      </div>
      <div className="w-full h-50% flex justify-center items-center">
        <Cardsl />
      </div>
    </div>
  )
}

export default FoundItems