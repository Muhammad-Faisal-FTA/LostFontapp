'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OTP from '@/components/ui/OTPinput'; // Make sure this path is correct
import { setAuthData } from '@/lib/auth';  // 🔐 Import the token utility

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    const submitOTP = async () => {
      if (otp.length !== 4) return;

      setIsSubmitting(true);
      try {
        const res = await fetch(
          'https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/user/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp }),
          }
        );

        const data = await res.json();

        if (!res.ok || data.Code !== 200) {
          setResponse(`❌ Error: ${data?.message || 'Verification failed'}`);
          return;
        }

        // ✅ Extract data
        const { accessToken, refreshToken, createdUser } = data.data;

        // 💾 Store tokens & user
        setAuthData(accessToken, refreshToken, createdUser);

        // ✅ Show success and redirect
        setResponse('✅ User verified successfully!');
        alert('OTP Verified! Redirecting...');

        router.push('/sign-In');
      } catch (error: any) {
        setResponse(`❌ Network Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (otp.length === 4 && !isSubmitting) {
      submitOTP();
    }
  }, [otp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">✔️ OTP received on your email...</h1>

      <OTP length={4} onChange={handleOTPChange} />

      <p className="mt-4 text-gray-600">OTP Value: {otp}</p>

      {isSubmitting && (
        <div className="mt-2 text-blue-600 font-medium animate-pulse">Loading...</div>
      )}

      {response && <p className="mt-2 text-sm text-gray-700">{response}</p>}
    </div>
  );
}
