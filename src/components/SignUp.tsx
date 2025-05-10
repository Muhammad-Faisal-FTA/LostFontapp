// "use client";
// // import axios from "axi/os";

// import React, { useState } from "react";
// import Link from 'next/link';
// import { Label } from "./ui/label";
// import OTP from "@/components/OTP";
// import { Input } from "./ui/input";
// import { cn } from "@/lib/utils";

// export default  function SignUp() {
//   // from data object
//   interface FormDataType {
//     fullname: string;
//     email: string;
//     contact: string;
//     password: string;
//     profileImage: File | null;
//   }
//   const [formData, setFormData] = useState<FormDataType>({
//     fullname: "",
//     email: "",
//     contact: "",
//     password: "",
//     profileImage: null 
//   });
//   // 
//   const [otp, setOtp] = useState<string>(""); //  OTP state
//   // validation
//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { id, value } = e.target;
//   //   setFormData(prevState => ({
//   //     ...prevState,
//   //     [id]: value
//   //   }));
//   // };
//   // Form submission
//   // ===========================================================================
//   // client-side
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;



//   const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {    // Handle submission
//     e.preventDefault();
//     const formToSend = new FormData();
//     formToSend.append("fullName", formData.fullname);
//     formToSend.append("email", formData.email);
//     formToSend.append("contact", formData.contact);
//     formToSend.append("password", formData.password);
//     if (formData.profileImage) {
//       formToSend.append("profileImage", formData.profileImage);
//     }

//     formToSend.forEach((value, key) => {//consoling...
//       console.log(key, value);
//     });

//     try {
//       const response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/register", {
//         method: "POST",
//         // body: formToSend,
//         // content-t
//         body: JSON.stringify(formToSend),
//         credentials: 'include', // <--- IMPORTANT
        
//       });
      
//        setOtp("q") 
//       const data = await response.json();
//       if (!data.ok) {
//         throw new Error(data.message || "Something went wrong.");
//       }
//       console.log(data.message);
//     } catch (error: any) {
//       console.log("Registration failed:", error);
//     }
//   };
  
  
  
//   return (
//     <>
//     <div className={otp ? "block" : "hidden"}>
//         <OTP email={formData.email} />
//     </div>
  
//     <div className={`${otp? "display: hidden" : ""} max-w-md w-full mx-auto h-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black`}>
          
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Sign Up
//       </h2>

//       <form className="my-6" onSubmit={handleSubmit}>
//  {/* Name */}
//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="fullname">Name</Label>
//             <Input id="fullname" placeholder="your name" type="text" 
//              onChange={(e) => {
//               setFormData({
//                 ...formData, // Keep existing values
//                 fullname: e.target.value, // Update the "name" field
//               });
//             }}
//             />
//           </LabelInputContainer>


// {/* Email */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input id="email" placeholder="your email address" type="email"
//            onChange={(e) => {
//             setFormData({
//               ...formData, // Keep existing values
//               email: e.target.value, // Update the "email" field
//             });
//           }}
//           />
//         </LabelInputContainer>

// {/* Phone number */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="contact">Phone Number</Label>
//           <Input id="contact"  placeholder="0311-1234567"  type="tel"  
//            onChange={(e) => {
//             setFormData({
//               ...formData, // Keep existing values
//               contact: e.target.value, // Update the "contact" field
//             });
//           }}
//           />
//         </LabelInputContainer>

// {/* Password  */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" placeholder="••••••••" type="password"
//            onChange={(e) => {
//             setFormData({
//               ...formData, // Keep existing values
//               password: e.target.value, // Update the "password" field
//             });
//           }}
//           />
//         </LabelInputContainer>

// {/* Profile Image */}
//         <LabelInputContainer className="mb-8">
//         <Label htmlFor="profileImage">Profile Image</Label>
//         <Input
//          id="profileImage"
//           type="file"
//            accept="image/*"
//           onChange={(e) => {
//                   const file = e.target.files?.[0] || null;
//                   setFormData({
//                     ...formData,
//                     profileImage: file,
//                   });
//               }}
//          />
//          </LabelInputContainer>

// {/* Submit button */}
//         <button
//           className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Sign up &rarr;
//           <BottomGradient />
//         </button >
//         <div className='text-center m-2 p-3' >
//          <p>Have already an account? <Link href={'/sign-In'} className='text-blue-700 underline'>LogIn</Link> </p>
//         </div>
        
//       </form>
//     </div>
//     </>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };
// // OTP UI





"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "./ui/label";
import OTP from "@/components/OTP";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function SignUp() {
  interface FormDataType {
    fullname: string;
    email: string;
    contact: string;
    password: string;
    profileImage: File | null;
  }

  const [formData, setFormData] = useState<FormDataType>({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    profileImage: null,
  });

  const [otp, setOtp] = useState<string>(""); // OTP state
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formToSend = new FormData();
    formToSend.append("fullName", formData.fullname);
    formToSend.append("email", formData.email);
    formToSend.append("contact", formData.contact);
    formToSend.append("password", formData.password);
    if (formData.profileImage) {
      formToSend.append("profileImage", formData.profileImage);
    }

    formToSend.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch(
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/register",
        {
          method: "POST",
          body: formToSend,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      console.log(data.message);
      setOtp("q"); // Trigger OTP view
    } catch (error: any) {
      console.log("Registration failed:", error.message);
    }
  };

  return (
    <>
      {otp ? (
        <OTP email={formData.email} />
      ) : (
        <div className="max-w-md w-full mx-auto h-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Sign Up
          </h2>

          <form className="my-6" onSubmit={handleSubmit}>
            {/* Name */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                placeholder="your name"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </LabelInputContainer>

            {/* Email */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="your email address"
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </LabelInputContainer>

            {/* Phone number */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="contact">Phone Number</Label>
              <Input
                id="contact"
                placeholder="0311-1234567"
                type="tel"
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            </LabelInputContainer>

            {/* Password */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </LabelInputContainer>

            {/* Profile Image */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData({ ...formData, profileImage: file });
                }}
              />
            </LabelInputContainer>

            {/* Submit button */}
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            <div className="text-center m-2 p-3">
              <p>
                Already have an account?{" "}
                <Link href={"/sign-In"} className="text-blue-700 underline">
                  LogIn
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};