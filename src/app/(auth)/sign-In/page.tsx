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
    <div className='w-full h-full  flex justify-around items-center'>
      <div className='w-[50%] h-full flex flex-col justify-center items-center'>
        <h1></h1>
        <p></p>
       <span></span>
       <div className='w-[25rem] h-[18.75rem] mb-2 items-center ml-0 mt-[2rem]'>
         <Image src={signinImg} alt="page image"  
          width={400} 
          height={300} 
          className="" />
        </div> 
      </div>
      <div className='w-[50%] h-full items-center'>
      <SignIn />
      </div>
    </div>
  )
}

export default SigninPage
