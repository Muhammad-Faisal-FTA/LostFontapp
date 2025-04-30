'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define context type
type AuthContextType = {
  otp: number | null;
  setOtp: (user: number | null) => void;
  // login: (username: string) => void;
  // logt: (username: string) => void;
  // logout: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [otp, setOtp] = useState<number | null>(null);
  useEffect(() => {
    setOtp(13);
  }, []);
  // const login = (username: string) => setUser(username);
  // const logout = () => setUser(null);
  // const logt = (username: string) => setUser(username+"789")
//  login, logout, logt
return (
  <AuthContext.Provider value={{ otp, setOtp }}>
    {children}
  </AuthContext.Provider>
);
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
