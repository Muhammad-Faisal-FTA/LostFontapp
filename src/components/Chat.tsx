
"use client";

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SOCKET_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com';//t
const API_BASE = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat';//t
const SEND_MESSAGE_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat/send-message';//t
const USER_ME_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat/get-messaged-users';//t

interface User {
  _id: string;// product id posted by receiver
  name: string;
}

interface Message {
  senderId: string; //  current user profile id
  receiverId: string; // receiver who posted the card and know receive the message
  message: string;
  timestamp: string | Date;
}

export default function ChatApp({ receiverId, item }: { receiverId?: string; item?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const socket = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 1) Pull from URL if not passed as prop
  const searchParams = useSearchParams();
  receiverId = receiverId ?? searchParams.get("receiverId") ?? undefined;
  item = item ?? searchParams.get("item") ?? undefined;

  // helper to load any conversation
  let fetchMessages = async (userId: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return console.error("No token");

    try {
      const sel = users.find((u) => u._id === userId) || null;
      setSelectedUser(sel);
      const res = await axios.get(`${API_BASE}/get-messages/${item}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched messages:", res.data.data);
      setMessages(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  let sendMessage = async () => {
    const token = localStorage.getItem("accessToken");
    // return;
    if (!token) return console.error("No token");
    if (!receiverId) return console.error("Receiver not selected.");

    if (!newMessage.trim()) return;

    const payload = { itemId: item, receiverId: receiverId, message: newMessage };
    try {
      await axios.post(SEND_MESSAGE_ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.current?.emit("send-message", payload);
      // setMessages((m) => [
      //   ...m,
      //   { ...payload, senderId: currentUser!._id, timestamp: new Date() },
      // ]);
      // setNewMessage("");
    } catch (e) {
      console.error(e);
    }
  };


  // 3) If we have a receiverId, load that conversation
  useEffect(() => {
    if (!receiverId) return;
    fetchMessages(receiverId);
  }, [receiverId]);

  // 4) Inject sample messages once we know currentUser
  // useEffect(() => {
  //   if (receiverId && item && currentUser) {
  //     const receiver: User = { _id: receiverId, name: "User from item card" };
  //     setSelectedUser(receiver);
  //     setMessages([
  //       {
  //         senderId: receiverId,
  //         receiverId: currentUser._id,
  //         message: `Hello! Is this your item: "${item}"?`,
  //         timestamp: new Date(),
  //       },
  //       {
  //         senderId: currentUser._id,
  //         receiverId: receiverId,
  //         message: "Yes, I posted it. Let's connect!",
  //         timestamp: new Date(),
  //       },
  //     ]);
  //   }
  // }, [receiverId, item, currentUser]);

  // ===============================================================================

  // scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // =================================================================================

  // 2) Initialize socket, fetch user & contacts
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token");
          return;
        }

        socket.current = io(SOCKET_ENDPOINT, { auth: { token } });

        socket.current.on("receive-message", (msg: Message) => {
          if (
            msg.senderId === selectedUser?._id ||
            msg.receiverId === selectedUser?._id
          ) {
            setMessages((m) => [...m, msg]);
          }
        });
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };

    initializeSocket();

    return () => {
      socket.current?.disconnect();
    };
  }, [selectedUser]);


  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await axios.get(USER_ME_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data.user);
      // sample message...
      // If receiverId and item are passed, simulate a first message
      if (receiverId && item) {
        const receiver: User = {
          _id: receiverId,
          name: "User from item card"
        };
        setSelectedUser(receiver);
        // setMessages([
        //   {
        //     senderId: receiverId,
        //     receiverId: res.data.user._id,
        //     message: `Hello! Is this your item: "${item}"?`,
        //     timestamp: new Date(),
        //   },
        //   {
        //     senderId: res.data.user._id,
        //     receiverId: receiverId,
        //     message: "Yes, I posted it. Let's connect!",
        //     timestamp: new Date(),
        //   },
        // ]);
      }


    } catch (err) {
      console.error('Failed to fetch current user info:', err);
    }
  };

  const fetchUsers = async (token: string) => {
    try {
      const res = await axios.get(`${API_BASE}/get-messaged-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token not found. Please log in.');
      return;
    }

    // socket.current = io(SOCKET_ENDPOINT, {
    //   auth: { token },
    // });

    // socket.current.on('receive-message', (message: Message) => {
    //   if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
    //     setMessages((prev) => [...prev, message]);
    //   }
    // });

    fetchCurrentUser(token);
    fetchUsers(token);

    // return () => {
    //   socket.current?.disconnect();
    // };
  }, []);


  return (
    <div className="flex h-screen font-sans relative">
      {/* Sidebar */}
      <div
        className={`$${sidebarVisible ? 'block w-4/5' : 'hidden'} md:block w-[25%] bg-[#075E54] text-white p-4 overflow-y-auto`}
      >
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        {Array.isArray(users) &&
          users.map((user) => (
            <div
              key={user._id}
              className={`p-2 rounded cursor-pointer hover:bg-[#0d7e6b] ${selectedUser?._id === user._id ? 'bg-[#0d7e6b]' : ''}`}
              onClick={() => fetchMessages(user._id)}
            >
              {user.name}
            </div>
          ))}
        <Link
          href="/"
          className="text-[0.87rem] text-center px-1 py-2 bg-blue-500 text-white rounded block mt-4 text-center"
        >
          Home
        </Link>
      </div>

      {/* Toggle button */}
      <button
        className="md:hidden absolute top-4 left-3 z-10 bg-[#075E54] text-white p-2 rounded-md"
        onClick={() => setSidebarVisible((prev) => !prev)}
      >
        {sidebarVisible ? 'Hide' : 'Show'} Sidebar
      </button>

      {/* Chat area */}
      <div className="w-full md:w-3/4 flex flex-col bg-white">
        <div
          className={`p-4 border-b border-gray-200 font-medium text-[#333] ${sidebarVisible ? 'pl-20' : 'pl-[2rem]'}`}
        >
          {selectedUser ? `Chatting with ${selectedUser.name}` : 'Select a contact to chat'}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {
            // Array.isArray(messages) ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 max-w-xs p-2 rounded-xl text-sm ${msg.senderId === currentUser?._id
                  ? 'bg-[#DCF8C6] self-end ml-auto'
                  : 'bg-gray-200'
                  }`}
              >
                {msg.message}
                <div className="text-[10px] text-gray-500 text-right mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))
            // ) : null
          }
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            className="flex-1 border rounded-lg px-4 py-2 mr-2 text-sm"
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
