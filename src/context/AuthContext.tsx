"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if the 'user' key exists in localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        // Parse the user data only if it's a valid JSON string
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
    
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


// src/context/AuthContext.tsx
// "use client";
// import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// interface AuthContextType {
//   user: any | null;
//   accessToken: string | null;
//   login: (user: any, accessToken: string, refreshToken: string) => void;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("accessToken");

//       if (storedUser && storedToken) {
//         setUser(JSON.parse(storedUser));
//         setAccessToken(storedToken);
//       }
//     } catch (err) {
//       console.error("Error parsing user from localStorage", err);
//       localStorage.removeItem("user"); // clear corrupted data
//       localStorage.removeItem("accessToken");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = (user: any, accessToken: string, refreshToken: string) => {
//     setUser(user);
//     setAccessToken(accessToken);
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setAccessToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };

//   return (
//     <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
