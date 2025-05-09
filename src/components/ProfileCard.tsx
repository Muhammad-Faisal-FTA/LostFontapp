// 'use client';

// import { useState, useRef, ChangeEvent, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// type MessageType = {
//   text: string;
//   type: 'success' | 'error';
// };

// type ProfileData = {
//   fullfullName: string;
//   contact: string;
//   profileImage: string;
// };

// export default function ProfileUpdate() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [message, setMessage] = useState<MessageType | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileData>({
//     fullfullName: '',
//     contact: '',
//     profileImage: '',
//   });
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   // Define the handleImageChange function
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleApiResponse = async (response: Response) => {
//     const contentType = response.headers.get('content-type');
    
//     if (!contentType?.includes('application/json')) {
//       const text = await response.text();
//       throw new Error(text || 'Invalid response from server');
//     }

//     return await response.json();
//   };

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(
//           'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/profile',
//           {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`,
//               'Accept': 'application/json',
//             },
//           }
//         );

//         const data = await handleApiResponse(response);
//         setProfileData({
//           fullfullName: data.fullName || '',
//           contact: data.contact || '',
//           profileImage: data.profileImage || '',
//         });
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setMessage({
//           text: error instanceof Error ? error.message : 'Failed to load profile',
//           type: 'error',
//         });
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const updateProfileInfo = async () => {
//     if (!profileData.fullName.trim()) {
//       setMessage({ text: 'Full name is required', type: 'error' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage(null);

//     try {
//       const response = await fetch(
//         'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile',
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Accept': 'application/json',
//           },
//           body: JSON.stringify({
//             fullName: profileData.fullName,
//             contact: profileData.contact,
//           }),
//         }
//       );

//       const data = await handleApiResponse(response);
      
//       if (response.ok) {
//         setMessage({ text: 'Profile updated successfully!', type: 'success' });
//       } else {
//         throw new Error(data.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setMessage({
//         text: error instanceof Error ? error.message : 'An error occurred',
//         type: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateProfileImage = async () => {
//     if (!selectedImage) {
//       setMessage({ text: 'Please select an image first', type: 'error' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();
//       formData.append('profileImage', selectedImage);

//       const response = await fetch(
//         'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile',
//         {
//           method: 'PATCH',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Accept': 'application/json',
//           },
//           body: formData,
//         }
//       );

//       const data = await handleApiResponse(response);

//       if (response.ok) {
//         setMessage({
//           text: 'Profile image updated successfully!',
//           type: 'success',
//         });
//         setSelectedImage(null);
//         if (fileInputRef.current) fileInputRef.current.value = '';
//       } else {
//         throw new Error(data.message || 'Failed to update profile image');
//       }
//     } catch (error) {
//       console.error('Error updating profile image:', error);
//       setMessage({
//         text: error instanceof Error ? error.message : 'An error occurred',
//         type: 'error',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Profile</h1>

//       {/* Profile Image Section */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Profile Image
//         </label>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <img
//               src={imagePreview || profileData.profileImage || '/default-avatar.png'}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
//             />
//           </div>
//           <div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageChange}
//               accept="image/*"
//               className="hidden"
//               id="profileImage"
//             />
//             <label
//               htmlFor="profileImage"
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition"
//             >
//               Choose Image
//             </label>
//             {selectedImage && (
//               <button
//                 onClick={updateProfileImage}
//                 disabled={isLoading}
//                 className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400 transition"
//               >
//                 {isLoading ? 'Uploading...' : 'Upload'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Profile Info Form */}
//       <div className="space-y-4">
//         <div>
//           <label
//             htmlFor="fullName"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={profileData.fullName}
//             onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your full name"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="contact"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Contact
//           </label>
//           <input
//             type="text"
//             id="contact"
//             name="contact"
//             value={profileData.contact}
//             onChange={(e) => setProfileData({...profileData, contact: e.target.value})}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your contact"
//           />
//         </div>

//         <button
//           onClick={updateProfileInfo}
//           disabled={isLoading}
//           className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-400 transition"
//         >
//           {isLoading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </div>

//       {/* Message Display */}
//       {message && (
//         <div
//           className={`mt-4 p-3 rounded-md ${
//             message.type === 'success'
//               ? 'bg-green-100 text-green-700'
//               : 'bg-red-100 text-red-700'
//           }`}
//         >
//           {message.text}
//         </div>
//       )}
//     </div>
//   ); 
// }

// "use client";

// import { useState, useEffect } from "react";

// export default function ProfileUpdate() {
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loadingImg, setLoadingImg] = useState(false);

//   const [fullName, setFullName] = useState("");
//   const [contact, setContact] = useState("");
//   const [loadingInfo, setLoadingInfo] = useState(false);

//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   // Get token from localStorage on mount
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken"); // Adjust if your token is named differently
//     setAccessToken(token);
//   }, []);

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !accessToken) return;

//     setProfileImage(file);
//     setPreviewUrl(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       setLoadingImg(true);
//       const res = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile", {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: formData,
//       });

//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await res.json();
//         console.log("Image updated:", data);
//       } else {
//         const text = await res.text();
//         console.error("Unexpected response:", text);
//       }

//     } catch (err) {
//       console.error("Image update error:", err);
//     } finally {
//       setLoadingImg(false);
//     }
//   };

//   const handleInfoSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!accessToken) return;

//     try {
//       setLoadingInfo(true);
//       const res = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ fullName, contact }),
//       });

//       const data = await res.json();
//       console.log("Profile info updated:", data);
//     } catch (err) {
//       console.error("Info update error:", err);
//     } finally {
//       setLoadingInfo(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow rounded-lg space-y-6">
//       {/* Image Update Form */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Update Profile Picture</h2>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="mb-2"
//         />
//         {previewUrl && (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="w-32 h-32 object-cover rounded-full border mt-2"
//           />
//         )}
//         {loadingImg && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
//       </div>

//       {/* Info Update Form */}
//       <form onSubmit={handleInfoSubmit} className="space-y-4">
//         <h2 className="text-xl font-semibold">Update Profile Info</h2>
//         <div>
//           <label className="block text-sm font-medium">Full Name</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Contact</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           disabled={loadingInfo}
//         >
//           {loadingInfo ? "Updating..." : "Update Info"}
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client"
// import { useState, useRef } from 'react';
// import Image from 'next/image';

// interface ProfileData {
//   name: string;
//   email: string;
//   contact: string;
//   profileImage: string;
// }

// interface ProfileCardProps {
//   initialData: ProfileData;
//   accessToken: string;
//   refreshToken: string;
//   onTokenRefresh: (newAccessToken: string) => void;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   initialData,
//   accessToken,
//   refreshToken,
//   onTokenRefresh,
// }) => {
//   const [profileData, setProfileData] = useState<ProfileData>(initialData);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempData, setTempData] = useState<Omit<ProfileData, 'email' | 'profileImage'>>({
//     name: initialData.name,
//     contact: initialData.contact,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setTempData(prev => ({ ...prev, [name]: value }));
//   };

//   const toggleEdit = () => {
//     if (isEditing) {
//       handleSave();
//     } else {
//       setTempData({ name: profileData.name, contact: profileData.contact });
//       setIsEditing(true);
//     }
//   };

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       if (!file.type.startsWith('image/')) {
//         setError('Please upload an image file');
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         setError('Image size should be less than 2MB');
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const formData = new FormData();
//         formData.append('profileImage', file);

//         let response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile', {
//           method: 'PATCH',
//           headers: { 'Authorization': `Bearer ${accessToken}` },
//           body: formData,
//         });

//         if (response.status === 401) {
//           const refreshResponse = await fetch('/api/refresh', {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ refreshToken }),
//           });

//           if (!refreshResponse.ok) throw new Error('Session expired. Please log in again.');

//           const { accessToken: newAccessToken } = await refreshResponse.json();
//           onTokenRefresh(newAccessToken);

//           response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile', {
//             method: 'PATCH',
//             headers: { 'Authorization': `Bearer ${newAccessToken}` },
//             body: formData,
//           });
//         }

//         if (!response.ok) throw new Error('Failed to update profile image');

//         const result = await response.json();
//         setProfileData(prev => ({ ...prev, profileImage: result.profileImageUrl }));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to update profile image');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSave = async () => {
//     if (!tempData.name.trim() || !tempData.contact.trim()) {
//       setError('Name and contact are required');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       let response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(tempData),
//       });

//       if (response.status === 401) {
//         const refreshResponse = await fetch('/api/refresh', {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ refreshToken }),
//         });

//         if (!refreshResponse.ok) throw new Error('Session expired. Please log in again.');

//         const { accessToken: newAccessToken } = await refreshResponse.json();
//         onTokenRefresh(newAccessToken);

//         response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile', {
//           method: 'PATCH', // ✅ Fixed method from PATCH to PATCH
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${newAccessToken}`,
//           },
//           body: JSON.stringify(tempData),
//         });
//       }

//       if (!response.ok) throw new Error('Failed to update profile');

//       const result = await response.json();
//       setProfileData(prev => ({ ...prev, ...result }));
//       setIsEditing(false);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md mt-4 md:max-w-md sm:w-full">
//       <div className="flex flex-col items-center text-center space-y-4">
//         <div className="relative w-32 h-32">
//           <Image
//             src={profileData.profileImage || '/default-profile.png'}
//             alt="Profile"
//             fill
//             className="rounded-full object-cover border-4 border-gray-300 cursor-pointer hover:border-blue-500 transition"
//             onClick={handleImageClick}
//           />
//           {isLoading && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
//               <div className="h-6 w-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
//             </div>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//             className="hidden"
//           />
//         </div>
//         <div className="w-full">
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={tempData.name}
//               onChange={handleInputChange}
//               className="w-full mb-2 px-3 py-2 border rounded-lg"
//               disabled={isLoading}
//             />
//           ) : (
//             <h2 className="text-lg font-semibold text-gray-800">{profileData.name}</h2>
//           )}
//           <p className="text-sm text-gray-500">{profileData.email}</p>
//           <div className="mt-2">
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="contact"
//                 value={tempData.contact}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 disabled={isLoading}
//               />
//             ) : (
//               <p className="text-gray-600">{profileData.contact}</p>
//             )}
//           </div>
//         </div>
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <button
//           onClick={toggleEdit}
//           disabled={isLoading}
//           className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
//         >
//           {isLoading ? (isEditing ? 'Saving...' : 'Loading...') : isEditing ? 'Save Changes' : 'Edit Profile'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProfileData {
  fullName: string;
  email: string;
  contact: string;
  profileImage: string;
}

interface ProfileCardProps {
  initialData: ProfileData;
  accessToken: string;
  refreshToken: string;
  onTokenRefresh: (newAccessToken: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  initialData,
  accessToken,
  refreshToken,
  onTokenRefresh,
}) => {
  const [profileData, setProfileData] = useState<ProfileData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<Omit<ProfileData, 'email' | 'profileImage'>>({
    fullName: initialData.fullName,
    contact: initialData.contact,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setTempData({ fullName: profileData.fullName, contact: profileData.contact });
      setIsEditing(true);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("profileImage", file);

        let response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile", {
          method: "PATCH",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        });

        if (response.status === 401) {
          const refreshResponse = await fetch("/api/refresh", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          if (!refreshResponse.ok) throw new Error("Session expired. Please log in again.");

          const { accessToken: newAccessToken } = await refreshResponse.json();
          onTokenRefresh(newAccessToken);

          response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile", {
            method: "PATCH",
            headers: { Authorization: `Bearer ${newAccessToken}` },
            body: formData,
          });
        }

        if (!response.ok) throw new Error("Failed to update profile image");

        const result = await response.json();
        setProfileData(prev => ({ ...prev, profileImage: result.profileImageUrl }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update profile image");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!tempData.fullName.trim() || !tempData.contact.trim()) {
      setError("Full name and contact are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tempData),
      });

      if (response.status === 401) {
        const refreshResponse = await fetch("/api/refresh", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) throw new Error("Session expired. Please log in again.");

        const { accessToken: newAccessToken } = await refreshResponse.json();
        onTokenRefresh(newAccessToken);

        response = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/edit-profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
          body: JSON.stringify(tempData),
        });
      }

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      setProfileData(prev => ({ ...prev, ...result }));
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md mt-4 md:max-w-md sm:w-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-32 h-32">
          <Image
            src={profileData.profileImage || "/default-profile.png"}
            alt="Profile"
            fill
            className="rounded-full object-cover border-4 border-gray-300 cursor-pointer hover:border-blue-500 transition"
            onClick={handleImageClick}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <div className="h-6 w-6 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="w-full">
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={tempData.fullName}
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
              disabled={isLoading}
            />
          ) : (
            <h2 className="text-lg font-semibold text-gray-800">{profileData.fullName}</h2>
          )}
          <p className="text-sm text-gray-500">{profileData.email}</p>
          <div className="mt-2">
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={tempData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                disabled={isLoading}
              />
            ) : (
              <p className="text-gray-600">{profileData.contact}</p>
            )}
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          onClick={toggleEdit}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? (isEditing ? "Saving..." : "Loading...") : isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
