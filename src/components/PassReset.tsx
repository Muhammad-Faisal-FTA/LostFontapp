"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
// import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Added for redirection

export default function ResetPassword() {
  const router = useRouter(); // ✅ Router for navigation

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1); // Step state to handle form flow (1: email, 2: otp, 3: password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Submit the email to trigger sending the verification otp
  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      // Log the raw response text to see what we're receiving
      const responseText = await response.text();
      console.log("Raw response:", responseText); // Log the raw response

      // Try to parse JSON from the response
      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (response.ok) {
        alert("Verification otp sent to your email.");
        setStep(2); // Move to the next step: verify otp
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to send verification otp:", error);
      alert("Failed to send verification otp. Try again.");
    }
  };

  // Submit the verification otp
  const handleSubmitotp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.otp) {
      alert("Please enter the verification otp.");
      return;
    }

    try {
      const response = await fetch(
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp: formData.otp }),
        }
      );

      // Log the raw response text to see what we're receiving
      const responseText = await response.text();
      console.log("Raw response:", responseText); // Log the raw response

      // Try to parse JSON from the response
      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (response.ok) {
        alert("Verification successful.");
        setStep(3); // Move to password reset step
      } else {
        alert(`Verification failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Verification failed", error);
      alert("Verification failed. Try again.");
    }
  };

  // Submit the new password
  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        }
      );

      // Log the raw response text to see what we're receiving
      const responseText = await response.text();
      console.log("Raw response:", responseText); // Log the raw response

      // Try to parse JSON from the response
      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (response.ok) {
        alert("Password reset successful.");
        router.push("/sign-In"); // Redirect to login page after successful password reset
      } else {
        alert(`Password reset failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Password reset failed", error);
      alert("Password reset failed. Try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto my-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Reset Password
      </h2>

      {step === 1 && (
        <form className="my-4" onSubmit={handleSubmitEmail}>
          {/* Email */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="yourEmail@gmail.com"
              type="email"
              onChange={handleChange}
            />
          </LabelInputContainer>
          <button
            className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
            type="submit"
          >
            Send Verification otp
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="my-4" onSubmit={handleSubmitotp}>
          {/* Verification otp */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="otp">Verification otp</Label>
            <Input
              id="otp"
              placeholder="Enter verification otp"
              type="text"
              onChange={handleChange}
            />
          </LabelInputContainer>
          <button
            className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
            type="submit"
          >
            Verify otp
          </button>
        </form>
      )}

      {step === 3 && (
        <form className="my-4" onSubmit={handleSubmitPassword}>
          {/* New Password */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              placeholder="Enter new password"
              type="password"
              onChange={handleChange}
            />
          </LabelInputContainer>

          {/* Confirm Password */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm new password"
              type="password"
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
