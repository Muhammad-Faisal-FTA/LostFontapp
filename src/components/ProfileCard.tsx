

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
interface UserData {
  fullName: string;
  contact: string;
  email: string;
  profileImage: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          console.error('No tokens found');
          return;
        }

        const res = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/get-current-user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
         alert(accessToken)
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();
        setUser(data?.data?.user || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4 text-red-500">Failed to load user data.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <div className="flex flex-col items-center">
        <Image
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
        />
        <h2 className="text-2xl font-semibold mb-2">{user.fullName}</h2>
        <p className="text-gray-600 mb-1">📞 {user.contact}</p>
        <p className="text-gray-600">📧 {user.email}</p>
      </div>
    </div>
  );
}
