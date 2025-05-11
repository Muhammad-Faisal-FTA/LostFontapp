"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


interface OtpVerificationFormProps {
  email: string;
  // onVerified: () => void;
}

export default function OTP({ email }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const handleSubmitotp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the verification otp.");
      return;
    }

    try {
      const response = await fetch(
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (response.ok) {
        alert("Verification successful.");
       setTimeout(()=>{
          router.push("/sign-In");
        }, 100)
      } else {
        alert(`Verification failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed. Try again.");
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmitotp}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="otp">Verification otp</Label>
        <Input
          id="otp"
          placeholder="Enter verification otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </LabelInputContainer>
      <button
        className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
        type="submit"
      >
        Verify otp
      </button>
    </form>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
