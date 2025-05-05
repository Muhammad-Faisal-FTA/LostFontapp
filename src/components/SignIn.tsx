// "use client";
// import React, { useState } from "react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { cn } from "@/lib/utils";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // ✅ Added for redirection

// export default function SignIn() {
//   const router = useRouter(); // ✅ Router for navigation

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formData.password && formData.email) {
//       console.log("Form submitted");
//     }

//     try {
//       const response = await fetch("https://lost-and-found-backend-ydw0.onrender.com/api/v1/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log(data.message);

//       if (response.ok) {
//         const { accessToken, refreshToken, createdUser } = data.data;

//         // ✅ Store tokens and user in localStorage
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         localStorage.setItem("user", JSON.stringify(createdUser));

//         alert("Login successful!");
//         router.push("/"); // ✅ Redirect to Home page
//       } else {
//         alert(`Login failed: ${data.message}`);
//       }

//     } catch (error) {
//       console.log("Login failed. Try again.");
//       alert("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md w-full mx-auto my-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Log In
//       </h2>
//       <form className="my-4" onSubmit={handleSubmit}>
//         {/* Email */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             placeholder="yourEmail@gmail.com"
//             type="email"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>
//         {/* Password */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             placeholder="••••••••"
//             type="password"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* forgetPassword */}
//         <Link
//           href={"/reset-Password"}
//           className="text-[0.8rem] text-blue-600 flex justify-end m-2 italic  underline"
//         >
//           forget password?
//         </Link>

//         <button
//           className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Log in &rarr;
//           <BottomGradient />
//         </button>
//         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

//         <div className="flex flex-col space-y-4">
//           {/* Auth Buttons (commented out) */}
//         </div>
//         {/* sign up if not account */}
//         <span className="text-[1rem] flex justify-center items-center mt-3 p-1 ">
//           Don&apos;t have an account?&nbsp;
//           <Link
//             href={"/sign-Up"}
//             className="text-[1rem] text-blue-600 underline"
//           >
//             Sign up
//           </Link>
//         </span>
//       </form>
//     </div>
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

"use client";
import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken, createdUser } = data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(createdUser));
        localStorage.setItem("loginTime", Date.now().toString()); // ✅ Store login time

        window.dispatchEvent(new Event("authChanged"));
        alert("Login successful!");
        router.push("/");
      } else {
        alert(`Login failed: ${data.message}`);
      }

    } catch (error) {
      console.log("Login failed. Try again.");
      alert("Login failed. Try again.");
    }
  };

  // ✅ Auto logout after 12 hours
  useEffect(() => {
    const checkTokenExpiration = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const loginTimestamp = parseInt(loginTime, 1);
        const twelveHours = 1 * 1 * 1 * 100;
        const now = Date.now();

        if (now - loginTimestamp > twelveHours) {
          // Clear everything
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("loginTime");
          window.dispatchEvent(new Event("authChanged"));
          alert("Session expired. Please log in again.");
          router.push("/signin");
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000); // every 5 mins
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="max-w-md w-full mx-auto my-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Log In</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="yourEmail@gmail.com"
            type="email"
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={handleChange}
          />
        </LabelInputContainer>

        <Link
          href={"/reset-Password"}
          className="text-[0.8rem] text-blue-600 flex justify-end m-2 italic underline"
        >
          forget password?
        </Link>

        <button
          className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Log in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <span className="text-[1rem] flex justify-center items-center mt-3 p-1">
          Don&apos;t have an account?&nbsp;
          <Link href={"/sign-Up"} className="text-[1rem] text-blue-600 underline">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);


// "use client";
// import React, { useState } from "react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext"; // ✅ Import useAuth hook

// export default function SignIn() {
//   const router = useRouter();
//   const { login } = useAuth(); // ✅ Get login function from AuthContext

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       alert("Please enter both email and password.");
//       return;
//     }

//     try {
//       const response = await fetch("https://lost-and-found-backend-ydw0.onrender.com/api/v1/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Response status:", response.status);
//       console.log("Response data:", data);

//       if (response.ok) {
//         const { accessToken, refreshToken, createdUser } = data.data;

//         // ✅ Use login from context (this also updates navbar immediately)
//         login(createdUser, accessToken, refreshToken);

//         alert("Login successful!");
//         router.push("/");
//       } else {
//         alert(`Login failed: ${data.message}`);
//       }
//     } catch (error) {
//       console.log("Login failed. Try again.");
//       alert("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md w-full mx-auto my-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Log In
//       </h2>
//       <form className="my-4" onSubmit={handleSubmit}>
//         {/* Email */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             placeholder="yourEmail@gmail.com"
//             type="email"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>
//         {/* Password */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             placeholder="••••••••"
//             type="password"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Forget Password */}
//         <Link
//           href={"/reset-Password"}
//           className="text-[0.8rem] text-blue-600 flex justify-end m-2 italic underline"
//         >
//           forget password?
//         </Link>

//         <button
//           className="mt-1 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Log in &rarr;
//           <BottomGradient />
//         </button>

//         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

//         <span className="text-[1rem] flex justify-center items-center mt-3 p-1">
//           Don&apos;t have an account?&nbsp;
//           <Link href={"/sign-Up"} className="text-[1rem] text-blue-600 underline">
//             Sign up
//           </Link>
//         </span>
//       </form>
//     </div>
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
