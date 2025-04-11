"use client";
import React, { useEffect, useState } from 'react';
import SignUp from '@/components/SignUp';
import Image from 'next/image';
import signupImg from '@/constants/signupImg.png';
import Loader from '@/app/circle-9360.gif'

const SignupPage = () => {
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

// Sign Up page
  return (
    <div className="w-full h-full  p-1 bg-Auth bg-cover bg-repeat
    flex justify-center md:justify-around items-center">
      {/* Left Section */}
      <div className="w-[50%] h-full p-2 m-1 hidden md:block flex-col justify-center items-center">
        <div className="w-full h-full ">
          <h1 className="text-[2.8rem] w-auto mt-[3rem] text-black font-sarabun font-bold p-3">
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

        <div className="w-[15rem] h-[13.75rem] mb-2 items-center mt-[2rem]">
          <Image src={signupImg} alt="page image" width={250} height={250} className="flex justify-center items-center" />
        </div> 
      </div>

      {/* Right Section */}
      <div className="w-[100%] md:w-[50%] h-full mt-[1rem] mb-1 p-1 mx-2  flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;