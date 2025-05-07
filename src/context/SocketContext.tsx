// contexts/SocketContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

// ✅ Replace with your actual Socket.IO server URL
const SOCKET_SERVER_URL = "https://lost-and-found-backend-ydw0.onrender.com"; // or your deployed server URL

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      // withCredentials: true, // Optional if using cookies/CORS
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};