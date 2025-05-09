// "use client"
// import React ,{useState,useEffect} from 'react'
// import Image from  'next/image';
// import SignIn from '@/components/SignIn'; 
// import signinImg from '@/constants/SigninImg.png'
// import Loader from '@/app/circle-9360.gif'

// const SigninPage = () => {
//  // ======================================================
//    // Loader
//   const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const timer = setTimeout(() => {
//     setLoading(false);
//   }, 2000);
//   return () => clearTimeout(timer);
// }, []);

// if (loading) {
//   return (
//     <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
//       <Image src={Loader} alt="Loading...wait" width={200} height={200} />
//     </div>
//   );
// }

//   //  
//  // ==========================================================

// // Sign In page
//   return (
//     <div className='w-[100%] h-[100vh]  bg-Auth bg-cover bg-repeat
//     flex justify-center md:justify-around items-center p-2'>
//       {/* Left section */}
//       <div className='w-[60%] h-full  hidden md:block flex-col justify-center items-center ml-1 '>
//         {/* page heading */}
//         <h1 className='w-[100%]  text-[3.125rem] leading-1 fount-sarabun font-[700] p-2 pl-7 m-2'>
//          Welcome to   <br />      
//         <span className='w-[80%] h-auto text-[3.7rem] fount-sarabun font-[700] ' >
//           [Lost & Found Website]
//         </span>
//         </h1>
//       {/* page discriptions */}
//       <div  className="w-[100%]  text-black">
//       <p className="w-[80%] h-auto text-black m-1 p-2">
//         We&apos;re here to help you find and recover your lost items with ease. Report lost belongings, search for found items, and connect with others on our user-friendly platform.  
//         <br />
//         Our goal is to reunite you with your possessions quickly and efficiently.  
//         <br />
//         If you need any assistance, feel free to reach out—we&apos;re here to help.
//         <br />
//         <br />
//         <span className="text-blue-700 font-semibold">Happy searching and good luck!</span>
//       </p>
//       </div>

//        {/* <span></span> */}
//        <div className='w-[15rem] h-[13.75rem] mb-2 items-center ml-0 mt-[2rem]'>
//          <Image src={signinImg} alt="page image"  
//           width={250} 
//           height={250} 
//           className="" />
//         </div> 
//       </div>
//       {/* Right section */}
//       <div className='w-[100%] h-[80%] md:w-[40%] p-4 items-center'>
//       <SignIn />
//       </div>
//     </div>
//   )
// }

// export default SigninPage


"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SignIn from '@/components/SignIn';
import signinImg from '@/constants/SigninImg.png';
import Loader from '@/app/circle-9360.gif';

const SigninPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // delay to simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Image src={Loader} alt="Loading...wait" width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-Auth bg-cover bg-repeat flex justify-center md:justify-around items-center p-2">
      {/* Left section */}
      <div className="w-[60%] h-full hidden md:flex flex-col justify-center items-center ml-1">
        <h1 className="text-[3.125rem] font-bold p-2 pl-7 m-2">
          Welcome to
          <br />
          <span className="text-[3.7rem] font-bold">
            [Lost & Found Website]
          </span>
        </h1>
        <div className="text-black p-2 w-full">
          <p className="w-[80%] text-black">
            We&apos;re here to help you find and recover your lost items with ease.
            <br />
            Report lost belongings, search for found items, and connect with others.
            <br />
            Our goal is to reunite you with your possessions quickly and efficiently.
            <br />
            <br />
            <span className="text-blue-700 font-semibold">
              Happy searching and good luck!
            </span>
          </p>
        </div>
        <div className="w-[15rem] h-[13.75rem] mb-2 mt-[2rem]">
          <Image src={signinImg} alt="page image" width={250} height={250} />
        </div>
      </div>

      {/* Right section */}
      <div className="w-full h-[100%] md:w-[40%] mb-[14rem] p-2 items-center">
        <SignIn />
      </div>
    </div>
  );
};

export default SigninPage;
