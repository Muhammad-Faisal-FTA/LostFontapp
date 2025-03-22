import React from "react";
//   ! useless component....
const PasswordResetInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-4 text-center">
        Don&apos;t worry, resetting your password is simple!
      </h2>
      <ol className="list-decimal pl-6 text-gray-700 text-sm md:text-base">
        <li>Enter your registered email to receive a password reset link.</li>
        <li>Verify your identity using the 6-digit code sent to your email.</li>
        <li>Create a new password to secure your account.</li>
      </ol>
      <div className="mt-4">
        <h3 className="text-lg md:text-xl font-semibold text-black">Password Tips:</h3>
        <ul className="list-disc pl-6 text-gray-700 text-sm md:text-base">
          <li>Use at least 8 characters.</li>
          {/* <li>Mix uppercase, lowercase, numbers, and special symbols for a strong password.</li> */}
        </ul>
      </div>
    </div>
  );
};

export default PasswordResetInfo;
