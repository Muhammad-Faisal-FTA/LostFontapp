"use client"

import { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';

const ParentComponent = () => {
  const [accessToken, setAccessToken] = useState('your-access-token');
  const refreshToken = 'your-refresh-token';

  const handleTokenRefresh = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    // You might also want to persist the new token
  };

  const initialProfileData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    contact: '+1 (555) 123-4567',
    profileImage: '/profile.jpg',
  };

  return (
    <div className="container mx-auto p-4">
      <ProfileCard
        initialData={initialProfileData}
        accessToken={accessToken}
        refreshToken={refreshToken}
        onTokenRefresh={handleTokenRefresh}
      />
    </div>
  );
};

export default ParentComponent;