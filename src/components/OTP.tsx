'use client';

import { useState, useEffect } from 'react';
import OTP from '@/components/ui/OTPinput'; // adjust path as needed

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    const submitOTP = async () => {
      if (otp.length !== 4) return;

      try {
        setIsSubmitting(true);
        const res = await fetch(
          'https://lost-and-found-backend-eosin.vercel.app/api/v1/user/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp }),
          }
        );

        const data = await res.json();
        setResponse(`✅ Success: ${JSON.stringify(data)}`);
        alert('OTP Verified!');
      } catch (error: any) {
        setResponse(`❌ Error: ${error.message}`);
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
