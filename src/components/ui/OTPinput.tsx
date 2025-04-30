'use client';

import { useRef } from 'react';

interface OTPInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

export default function OTP({ length = 6, onChange }: OTPInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only allow digits

    const newOtp = inputsRef.current.map((input, i) =>
      i === index ? value : input?.value || ''
    ).join('');

    onChange(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => (
        <input
        key={index}
        type="text"
        maxLength={1}
        inputMode="numeric"
        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
        onChange={(e) => handleChange(e.target.value, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        ref={(el) => {
          inputsRef.current[index] = el;
        }}
      />
      
      ))}
    </div>
  );
}
