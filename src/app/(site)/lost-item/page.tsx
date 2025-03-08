"use client"
import React ,{ useState } from 'react'
import Searchbar from '@/components/Searchbar'
import Button from '@/components/Button'
import Cardsl from '@/components/Cardsl'

const FoundItems = () => {
  const [leftBrac, setLeftBrac] = useState('{');
  const [rightBrac, setRightBrac] = useState('}');
  return (
    <div className='w-100vw h-100% m-1 p-2  bg-bgItems bg-repeat bg-cover'>
      {/* search bar */}
      <div className="w-full h-[4rem] flex justify-center items-center ">
        <h1 className="text-black text-[3.5rem] font-[700] leading-[100%]">{leftBrac}  Lost Items {rightBrac} </h1>
      </div>
      <div className="w-full h-[4rem] flex justify-center items-center  bg-black p-2">
         <Searchbar /> <Button />
      </div>
      <div className="w-full h-50% flex justify-center items-center">
        <Cardsl />
      </div>
    </div>
  )
}

export default FoundItems
