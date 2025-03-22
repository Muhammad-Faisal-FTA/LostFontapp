"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default  function SignUp() {
  // from data object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "+92 ",
    password: "",
    confirmpassword: ""
  });
  // validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // password conformation...
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form submitted");
    alert("sign up success! "+formData.name);
    alert("sign up success! "+formData.email);
    alert("sign up success! "+formData.phonenumber);
    alert("sign up success! "+formData.password);
    alert("sign up success! "+formData.confirmpassword);
  };
  return (
    <div className="max-w-md w-full mx-auto h-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign Up
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form className="my-6" onSubmit={handleSubmit}>
 {/* Name */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="your name" type="text" 
             onChange={(e) => {
              setFormData({
                ...formData, // Keep existing values
                name: e.target.value, // Update the "name" field
              });
            }}
            />
          </LabelInputContainer>


{/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="your email address" type="email"
           onChange={(e) => {
            setFormData({
              ...formData, // Keep existing values
              email: e.target.value, // Update the "email" field
            });
          }}
          />
        </LabelInputContainer>

{/* Phone number */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phonenumber">Phone Number</Label>
          <Input id="phonenumber"  placeholder="0311-1234567"  type="tel"  
           onChange={(e) => {
            setFormData({
              ...formData, // Keep existing values
              phonenumber: e.target.value, // Update the "phonenumber" field
            });
          }}
          />
        </LabelInputContainer>

{/* Password  */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password"
           onChange={(e) => {
            setFormData({
              ...formData, // Keep existing values
              password: e.target.value, // Update the "password" field
            });
          }}
          />
        </LabelInputContainer>

{/* Conform password */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="conformpassword">Conform Password</Label>
          <Input
            id="conformpassword"
            placeholder="••••••••"
            type="password"
            onChange={(e) => {
              setFormData({
                ...formData, // Keep existing values
                confirmpassword: e.target.value, // Update the "confirmpassword" field
              });
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
        </button >
        <div className='text-center m-2 p-3' >
         <p>Have already an account? <Link href={'/sign-In'} className='text-blue-700 underline'>LogIn</Link> </p>
        </div>
        
      </form>
    </div>
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
