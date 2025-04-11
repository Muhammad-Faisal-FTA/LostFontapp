"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import PassReset  from '@/components/PassReset'
import Image  from 'next/image'
import PassresetImage from '@/constants/signupImg.png'
import Loader from '@/app/circle-9360.gif'

// import PasswordResetInfo  from '@/components/PasswordResetInfo'
const ResetPassword = () => {
   // ======================================================
     // Loader
     const [loading, setLoading] = useState(false);
     useEffect(()=>{
      setLoading(true);
     }, [])
   
     if(!loading){
       return(
       <div className='w-[100vw] h-[100vh]  flex justify-center items-center '>
        <Image src={Loader} alt="Loading...wait" width={200} height={200} className="" />
       </div>
       );
     }
   // ==========================================================
  return (
    <div className='w-full  flex justify-around items-center
    bg-Auth bg-cover bg-repeat'>
       {/* Left Section */}
       <div className="w-[50%] hidden md:block h-full flex-col justify-center items-center">
        <div className="w-full h-full">
          <h1 className="text-[2.8rem] w-auto mt-[1rem] text-black font-sarabun font-bold p-3">
            Lost Something? Let&apos;s Help You Find It!
          </h1>
        </div>

        <div>
          <p className="text-[1.2rem] mt-[2rem] text-black font-sarala font-normal p-4">
            Report your lost items, search for found belongings, and connect with others effortlessly.
            Our platform is designed to reunite you with your possessions quickly and securely.
            <p className="mt-6">Sign Up Now to Get Started!</p>
            <span className="mt-[3rem]">Happy searching and good luck!</span>
          </p>
        </div>
        

        <div className="w-[16rem] h-[13.75rem] mb-2 items-center ml-2 mt-[2rem]">
          <Image src={PassresetImage} alt="page image" width={250} height={250} className="flex justify-center items-center" />
        </div>
      </div>

      {/* Right Section */}
      <div className='w-[100%] md:w-[50%] h-full p-1  flex flex-col justify-center items-center'>
        <PassReset />
      </div>
    </div>
  )
}

export default ResetPassword
