"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CloudCog } from "lucide-react";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword && formData.email) {
      alert("Password reset successful for " + formData.email);
    }
  };

  return (
    <div className="max-w-md h-[100%] w-full mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg">
      <h2 className="font-bold text-2xl text-center text-gray-800">Reset Password</h2>
      {/* Form for input , resat/forget password */}
       <form className="mt-6" onSubmit={handleSubmit}>
{/* Email */}
<LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="yourEmail@gmail.com" onChange={handleChange} />
          <button
          className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          submit
          </button>
          <BottomGradient />
        </LabelInputContainer>

{/* Verify Code */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">Verify Code</h3>
          {/* <p className="text-sm text-gray-500">An authentication code has been sent to your email.</p> */}
          <LabelInputContainer>
            <Label htmlFor="code">Code</Label>
            <Input id="code" type="text" placeholder="****" onChange={handleChange} />
          </LabelInputContainer>
          <p className="text-sm text-blue-500 cursor-pointer">Didn’t receive code? Resend</p>
        </div>

{/* Set Password */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 p-3">Set a Password</h3>
          <LabelInputContainer>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="New Password" onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="confirmPassword" className="pt-4">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
          </LabelInputContainer>
        </div>

{/* Submit Button */}
        <button
          className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Reset Password &rarr;
          <BottomGradient />
        </button>
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
  
