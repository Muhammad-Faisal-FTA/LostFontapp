"use client"
import React from 'react';
import SignUp from '@/components/SignUp';
import Image from  'next/image';
import signupImg from '@/constants/signupImg.png'

const SignupPage = () => {
  return (
    <div className="w-full h-full mt-5 p-8 flex justify-around items-center ">
      {/* Left Section */}
      <div className="w-[60%] h-full p-4 m-5  flex flex-col  justify-center items-center">
        <div className='w-full h-full '>
        <h1 className="text-[2.8rem] w-auto mt-[3rem] text-black font-sarabun font-bold p-3">
          Lost Something? Let's Help You Find It!
        </h1>
        </div>
      
        <div>
        <p className="text-[1.2rem] mt-[2rem]  text-black font-sarala font-normal p-4">
          Report your lost items, search for found belongings, and connect with others effortlessly.  
          Our platform is designed to reunite you with your possessions quickly and securely.  
           <p className='mt-6'>Sign Up Now to Get Started!</p>  
           <span className='mt-[3rem]'>Happy searching and good luck!</span> 
        </p>
        </div>

        <div className='w-[25rem] h-[18.75rem] items-center ml-0 mt-[2rem]'>
         <Image src={signupImg} alt="page image"  
          width={400} 
          height={300} 
          className="" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[50%] h-full flex justify-center items-center">
        <SignUp /> 
      </div>
    </div>
  );
};

export default SignupPage;