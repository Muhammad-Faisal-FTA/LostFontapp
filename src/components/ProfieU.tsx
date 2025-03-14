'use client';

import { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    idNumber: '123456',
    faculty: 'Engineering',
    contactNumber: '123-456-7890',
  });
  // console.log(profile.name);
  // console.log(profile.faculty);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md border mt-2">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="w-full">
          {['name', 'idNumber', 'faculty', 'contactNumber'].map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                name={field}
                value={profile[field as keyof typeof profile]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              />
            </div>
          ))}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
