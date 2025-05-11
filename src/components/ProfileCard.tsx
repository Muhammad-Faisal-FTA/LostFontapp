'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserProfile {
  _id: string;
  data: UserProfile;
  fullName: string;
  email: string;
  contact: string;
  profileImage: string;
}

export default function ProfileCard() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Get token from localStorage
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      // setTimeout(()=>{
      //   // alert(token);
      // }, 100)
      if (!token) {
        setTimeout(()=>{
          setError('Please login to view your profile');
        setLoading(false);
        router.push('/sign-In'); // Redirect to login if no token
        return;
        }, 100)
      }

      try {
        const response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/get-current-user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid - clear storage and redirect
            localStorage.removeItem('authToken');
            router.push('/sign-In');
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson: UserProfile = await response.json();
        // alert(data)
        const user: UserProfile = responseJson.data;
        // console.log(JSON.stringify(user, null, 2))
        setUserData(user);
        console.log(user._id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    setTimeout(()=>{
      fetchUserData();
    }, 1000)
  }, [router]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        No user data available
      </div>
    );
  }
  console.log(userData)
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <div className="h-48 w-full md:h-full md:w-48 relative">
            <Image
              src={userData.profileImage || ''}
              alt="Profile image"
              fill
              className="object-cover"
              priority
            />
            {/* upload file on update */}
            {/* <input
               type="file"
               accept="image/*"
               onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
               className="mt-4"
             /> */}

          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            User Profile
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              <span className="font-bold">Name:</span> {userData.fullName}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Contact:</span> {userData.contact}
            </p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('accessToken');
              router.push('/sign-In');
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>



          {/* udate image ! commented due to coar error.*/}
          {/* <button 
            onClick={
              async () => {
                if (!selectedFile) {
                  alert('Please select an image file.');
                  return;
                }
              
                const token = localStorage.getItem('accessToken');
                if (!token) {
                  alert('No token found. Please login again.');
                  router.push('/sign-In');
                  return;
                }
              
                const formData = new FormData();
                formData.append('profileImage', selectedFile);
              
                alert("This is token = "+token)
                try {
                  const response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/update-profile', {
                    method: 'PATCH',
                    headers: {
                      'Authorization': `Bearer ${token}`
                      // Do NOT set Content-Type manually here — let the browser set it with boundary
                    },
                    body: formData
                  });
                  if (!response.ok) {
                    throw new Error(`Failed to update profile image. Status: ${response.status}`);
                  }
              
                  const data = await response.json();
                  alert('Profile image updated successfully!');
                  console.log('Updated data:', data);
              
                  setUserData(data.data); // Refresh updated user data
                  console.log(data)
                } catch (err) {
                  console.error(err);
                  alert('Something went wrong while uploading the image.');
                }
              }
            }
              
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button> */}
        </div>
      </div>
    </div>
  );
}