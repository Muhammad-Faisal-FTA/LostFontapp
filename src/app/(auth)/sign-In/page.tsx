"use client"
import React ,{useState,useEffect} from 'react'
import Image from  'next/image';
import SignIn from '@/components/SignIn'
import signinImg from '@/constants/SigninImg.png'
const SigninPage = () => {
  // ======================================================
  // Loader
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
   setLoading(true);
  }, [])

  if(!loading){
    return(
    <>
      <h1>Loading...</h1>
    </>
    );
  }
// ==========================================================

// Sign In page
  return (
    <div className='w-[98%] h-full  flex justify-around items-center p-2'>
      {/* Left section */}
      <div className='w-[60%] h-full flex flex-col justify-center items-center ml-3 mt-0'>
        {/* page heading */}
        <h1 className='w-[100%] h-full text-[3.125rem] leading-1 fount-sarabun font-[700] p-2 pl-7 m-2'>
         Welcome to   <br />      
        <span className='w-[80%] h-auto text-[3.7rem] fount-sarabun font-[700] ' >
          [Lost & Found Website]
        </span>
        </h1>
      {/* page discriptions */}
      <div  className="w-[100%] h-auto text-black ">
      <p className="w-[80%] h-auto text-black m-2 p-2 pl-7 ">
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
       <div className='w-[25rem] h-[18.75rem] mb-2 items-center ml-0 mt-[2rem]'>
         <Image src={signinImg} alt="page image"  
          width={400} 
          height={300} 
          className="" />
        </div> 
      </div>
      {/* Right section */}
      <div className='w-[40%] h-full items-center'>
      <SignIn />
      </div>
    </div>
  )
}

export default SigninPage
