// "use client"

import UserProfileCard from "@/components/ProfileCard";

// import { useState } from 'react';
// import ProfileCard from '@/components/ProfileCard';

// const ParentComponent = () => {
//   const [accessToken, setAccessToken] = useState('your-access-token');
//   const refreshToken = 'your-refresh-token';

//   const handleTokenRefresh = (newAccessToken: string) => {
//     setAccessToken(newAccessToken);
//     // You might also want to persist the new token
//   };

//   const initialProfileData = {
//     fullName: 'John Doe',
//     email: 'john.doe@example.com',
//     contact: '+1 (555) 123-4567',
//     profileImage: '/profile.jpg',
//   };

//   return (
//     <div className="container items-center  mx-auto p-4">
//       <ProfileCard
       
//       />
//     </div>
//   );
// };

// export default ParentComponent;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserProfile = () => {
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     contact: "",
//     profileImage: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         // Replace with your actual JWT token (e.g., from localStorage, context, or auth state)
//         const token = localStorage.getItem("token"); // Example: Get token from localStorage

//         if (!token) {
//           throw new Error("No authentication token found. Please log in.");
//         }

//         const response = await axios.get(
//           "https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/get-current-user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const { fullName, email, contact, profileImage } = response.data.user;
//         setUserData({ fullName, email, contact, profileImage });
//         setLoading(false);
//       } catch (err) {
//     // Safely extract error message
//     const errorMessage =
//       err.response?.data?.message || // API error response (e.g., 4xx/5xx)
//       err.message ||                // Network/JS runtime error
//       "Failed to fetch user profile"; // Fallback

//     setError(errorMessage);
//     setLoading(false);
//   }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-4">Loading profile...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-4 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      
//       <div className="flex flex-col items-center mb-4">
//         {userData.profileImage ? (
//           <img
//             src={userData.profileImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover mb-4"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
//             <span className="text-gray-500">No Image</span>
//           </div>
//         )}
//       </div>

//       <div className="space-y-3">
//         <div>
//           <p className="text-sm font-medium text-gray-500">Full Name</p>
//           <p className="text-lg font-semibold">{userData.fullName}</p>
//         </div>

//         <div>
//           <p className="text-sm font-medium text-gray-500">Email</p>
//           <p className="text-lg font-semibold">{userData.email}</p>
//         </div>

//         <div>
//           <p className="text-sm font-medium text-gray-500">Contact</p>
//           <p className="text-lg font-semibold">{userData.contact || "Not provided"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


export default function ProfilePage() {
  return (
    <div>
      <h1>My Profile</h1>
      <UserProfileCard />
    </div>
  );
}
