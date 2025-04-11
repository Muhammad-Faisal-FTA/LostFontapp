"use client"
import React ,{useState,useEffect} from 'react'
import Image from  'next/image';
import SignIn from '@/components/SignIn'
import signinImg from '@/constants/SigninImg.png'
import Loader from '@/app/circle-9360.gif'

// import { div } from 'motion/react-client';
const SigninPage = () => {
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

// Sign In page
  return (
    <div className='w-[100%] h-[100vh]  bg-Auth bg-cover bg-repeat
    flex justify-center md:justify-around items-center p-2'>
      {/* Left section */}
      <div className='w-[60%] h-full  hidden md:block flex-col justify-center items-center ml-1 '>
        {/* page heading */}
        <h1 className='w-[100%]  text-[3.125rem] leading-1 fount-sarabun font-[700] p-2 pl-7 m-2'>
         Welcome to   <br />      
        <span className='w-[80%] h-auto text-[3.7rem] fount-sarabun font-[700] ' >
          [Lost & Found Website]
        </span>
        </h1>
      {/* page discriptions */}
      <div  className="w-[100%]  text-black">
      <p className="w-[80%] h-auto text-black m-1 p-2">
        We&apos;re here to help you find and recover your lost items with ease. Report lost belongings, search for found items, and connect with others on our user-friendly platform.  
        <br />
        Our goal is to reunite you with your possessions quickly and efficiently.  
        <br />
        If you need any assistance, feel free to reach out—we&apos;re here to help.
        <br />
        <br />
        <span className="text-blue-700 font-semibold">Happy searching and good luck!</span>
      </p>
      </div>

       {/* <span></span> */}
       <div className='w-[15rem] h-[13.75rem] mb-2 items-center ml-0 mt-[2rem]'>
         <Image src={signinImg} alt="page image"  
          width={250} 
          height={250} 
          className="" />
        </div> 
      </div>
      {/* Right section */}
      <div className='w-[100%] h-[80%] md:w-[40%] p-4 items-center'>
      <SignIn />
      </div>
    </div>
  )
}

export default SigninPage
