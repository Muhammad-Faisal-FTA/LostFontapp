// "use client";
// import React, { useState } from "react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { CloudCog } from "lucide-react";

// export default function ResetPassword() {
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };
  
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formData.newPassword === formData.confirmPassword && formData.email) {
//       alert("Password reset successful for " + formData.email);
//     }
//   };

//   return (
//     <div className="max-w-md h-[100%] w-full mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg">
//       <h2 className="font-bold text-2xl text-center text-gray-800">Reset Password</h2>
//       {/* Form for input , resat/forget password */}
//        <form className="mt-6" onSubmit={handleSubmit}>
// {/* Email */}
// <LabelInputContainer>
//           <Label htmlFor="email">Email Address</Label>
//           <Input id="email" type="email" placeholder="yourEmail@gmail.com" onChange={handleChange} />
//           <button
//           className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           submit
//           </button>
//           <BottomGradient />
//         </LabelInputContainer>

// {/* Verify otp */}
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold text-gray-700">Verify otp</h3>
//           {/* <p className="text-sm text-gray-500">An authentication otp has been sent to your email.</p> */}
//           <LabelInputContainer>
//             <Label htmlFor="otp">otp</Label>
//             <Input id="otp" type="text" placeholder="****" onChange={handleChange} />
//           </LabelInputContainer>
//           <p className="text-sm text-blue-500 cursor-pointer">Didn’t receive otp? Resend</p>
//         </div>

// {/* Set Password */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 p-3">Set a Password</h3>
//           <LabelInputContainer>
//             <Label htmlFor="newPassword">New Password</Label>
//             <Input id="newPassword" type="password" placeholder="New Password" onChange={handleChange} />
//           </LabelInputContainer>
//           <LabelInputContainer>
//             <Label htmlFor="confirmPassword" className="pt-4">Confirm Password</Label>
//             <Input id="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
//           </LabelInputContainer>
//         </div>

// {/* Submit Button */}
//         <button
//           className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Reset Password &rarr;
//           <BottomGradient />
//         </button>
//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//     return (
//       <>
//         <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//         <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//       </>
//     );
//   };
  
//   const LabelInputContainer = ({
//     children,
//     className,
//   }: {
//     children: React.ReactNode;
//     className?: string;
//   }) => {
//     return (
//       <div className={cn("flex flex-col space-y-2 w-full", className)}>
//         {children}
//       </div>
//     );
//   };
"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/user/forgot-password",
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
        "https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/user/verify",
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
        router.push("/login"); // Redirect to login page after successful password reset
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
