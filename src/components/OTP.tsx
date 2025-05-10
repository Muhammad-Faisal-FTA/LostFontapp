

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import OTP from '@/components/ui/OTPinput';
// import { setAuthData } from '@/lib/auth';

// export default function OTPPage() {
//   const [otp, setOtp] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [response, setResponse] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const email = searchParams.get('email'); // ✅ Get email from query string

//   const handleOTPChange = (value: string) => {
//     setOtp(value);
//   };

//   useEffect(() => {
//     const submitOTP = async () => {
//       if (!email || otp.length !== 4) return;

//       setIsSubmitting(true);
//       try {
//         const res = await fetch(
//           'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/verify',
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, otp }),
//           }
//         );

//         const data = await res.json();

//         if (!res.ok || data.Code !== 200) {
//           setResponse(`❌ Error: ${data?.message || 'Verification failed'}`);
//           return;
//         }

//         const { accessToken, refreshToken, createdUser } = data.data;

//         setAuthData(accessToken, refreshToken, createdUser);

//         setResponse('✅ User verified successfully!');
//         alert('OTP Verified! Redirecting...');

//         setTimeout(() => {
//           router.push('/sign-In'); // ✅ Check if this is your actual route
//         }, 100);
//       } catch (error: any) {
//         setResponse(`❌ Network Error: ${error.message}`);
//       } finally {
//         setIsSubmitting(false);
//       }
//     };

//     if (otp.length === 4 && !isSubmitting) {
//       submitOTP();
//     }
//   }, [otp, isSubmitting, email, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">
//         ✔️ OTP sent to {email || 'your email'}...
//       </h1>

//       <OTP length={4} onChange={handleOTPChange} />

//       <p className="mt-4 text-gray-600">OTP Value: {otp} on {email}</p>

//       {isSubmitting && (
//         <div className="mt-2 text-blue-600 font-medium animate-pulse">Verifying...</div>
//       )}

//       {response && <p className="mt-2 text-sm text-gray-700">{response}</p>}
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import OTP from '@/components/ui/OTPinput'; // ✅ Make sure the path is correct
// import { setAuthData } from '@/lib/auth';   // ✅ Utility to store tokens

// export default function OTPPage() {
//   const [otp, setOtp] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [response, setResponse] = useState<string | null>(null);
//   const router = useRouter();

//   const handleOTPChange = (value: string) => {
//     setOtp(value);
//   };

//   useEffect(() => {
//     const submitOTP = async () => {
//       if (otp.length !== 4) return;

//       setIsSubmitting(true);
//       try {
//         const res = await fetch(
//           'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/verify',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ otp }),
//           }
//         );

//         const data = await res.json();

//         if (!res.ok || data.Code !== 200) {
//           setResponse(`❌ Error: ${data?.message || 'Verification failed'}`);
//           return;
//         }

//         const { accessToken, refreshToken, createdUser } = data.data;

//         // Store tokens and user data
//         setAuthData(accessToken, refreshToken, createdUser);

//         setResponse('✅ User verified successfully!');
//         alert('OTP Verified! Redirecting...');

//         setTimeout(() => {
//           router.push('/sign-In'); // Make sure this path is correct
//         }, 100);
//       } catch (error: any) {
//         setResponse(`❌ Network Error: ${error.message}`);
//       } finally {
//         setIsSubmitting(false);
//       }
//     };

//     if (otp.length === 4 && !isSubmitting) {
//       submitOTP();
//     }
//   }, [otp, isSubmitting, router]); // ✅ Corrected dependencies

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">✔️ OTP received on your email...</h1>

//       <OTP length={4} onChange={handleOTPChange} />

//       <p className="mt-4 text-gray-600">OTP Value: {otp}</p>

//       {isSubmitting && (
//         <div className="mt-2 text-blue-600 font-medium animate-pulse">Verifying...</div>
//       )}

//       {response && <p className="mt-2 text-sm text-gray-700">{response}</p>}
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OTPInput from '@/components/ui/OTPinput'; // Renamed to avoid naming conflict
import { setAuthData } from '@/lib/auth';

interface OTPPageProps {
  email: string;
}

export default function OTPPage({ email }: OTPPageProps) {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<{message: string; type: 'success' | 'error'} | null>(null);
  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setOtp(value);
    // Clear any previous messages when OTP changes
    if (response) setResponse(null);
  };
// ================================================================
  const submitOTP = async () => {
    if (!email || otp.length !== 4) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(
        'https://lost-and-found-backend-v9hr.onrender.com/api/v1/user/verify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
          credentials: 'include' // If using cookies
        }
      );

      const data = await res.json();

      if (!res.ok || data.Code !== 200) {
        throw new Error(data?.message || 'Verification failed');
      }

      const { accessToken, refreshToken, createdUser } = data.data;
      setAuthData(accessToken, refreshToken, createdUser);

      setResponse({
        message: '✅ Verification successful! Redirecting...',
        type: 'success'
      });
// ========================================================================
      setTimeout(() => {
        router.push('/sign-In');
      }, 1500); // Give user time to see success message

    } catch (error: any) {
      setResponse({
        message: `❌ Error: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
console.log(email)
  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.length === 4 && !isSubmitting && email) {
      submitOTP();
    }
  }, [otp, isSubmitting, email, setAuthData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">
        OTP sent to <span className="text-blue-500">{email}</span>
      </h1>

      <OTPInput 
        length={4} 
        onChange={handleOTPChange} 
        // disabled={isSubmitting} 
      />

      {/* Manual submit button as fallback */}
      <button
        onClick={submitOTP}
        disabled={otp.length !== 4 || isSubmitting}
        className={`mt-4 px-4 py-2 rounded ${
          otp.length !== 4 || isSubmitting
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
      </button>

      {response && (
        <p className={`mt-4 text-sm ${
          response.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {response.message}
        </p>
      )}
    </div>
  );
}