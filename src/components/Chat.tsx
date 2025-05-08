// "use client"

// import { useEffect, useState, useRef } from 'react';
// import io, { Socket } from 'socket.io-client';
// import axios from 'axios';
// import Link from 'next/link';

// const SOCKET_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com';
// const API_BASE = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat';

// interface User {
//   _id: string;
//   name: string;
// }

// interface Message {
//   senderId: string;
//   receiverId: string;
//   content: string;
//   timestamp: string | Date;
// }

// export default function ChatApp() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const socket = useRef<Socket | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }

//     socket.current = io(SOCKET_ENDPOINT);

//     socket.current.on('receive-message', (message: Message) => {
//       if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     fetchUsers(token);

//     return () => {
//       socket.current?.disconnect();
//     };
//   }, [selectedUser]);

//   const fetchUsers = async (token: string) => {
//     try {
//       const res = await axios.get(`${API_BASE}/get-messaged-users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error('Failed to fetch users', err);
//     }
//   };

//   const fetchMessages = async (userId: string) => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }
//     try {
//       const selected = users.find((u) => u._id === userId) || null;
//       setSelectedUser(selected);
//       const res = await axios.get(`${API_BASE}/get-messages/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(res.data.messages);
//     } catch (err) {
//       console.error('Failed to fetch messages', err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }

//     const payload = {
//       receiverId: selectedUser?._id!,
//       content: newMessage,
//     };

//     try {
//       await axios.post(`${SOCKET_ENDPOINT}/chat/send-message`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       socket.current?.emit('send-message', payload);
//       setMessages([...messages, { ...payload, senderId: 'me', timestamp: new Date() }]);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Failed to send message', err);
//     }
//   };

//   return (
//     <div className="flex h-screen font-sans">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-[#075E54] text-white p-4 overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Contacts</h2>
//         {Array.isArray(users) && users.map((user) => (
//           <div
//             key={user._id}
//             className={`p-2 rounded cursor-pointer hover:bg-[#0d7e6b] ${
//               selectedUser?._id === user._id ? 'bg-[#0d7e6b]' : ''
//             }`}
//             onClick={() => fetchMessages(user._id)}
//           >
//             {user.name}
//           </div>
//         ))}
//         <Link href="/" className="text-[0.87rem] text-center px-1 py-2 bg-blue-500 text-white rounded block mt-4 text-center">
//           Home
//         </Link>
//       </div>

//       {/* Chat area */}
//       <div className="w-3/4 flex flex-col bg-white">
//         {/* Chat header */}
//         <div className="p-4 border-b border-gray-200 font-medium text-[#333]">
//           {selectedUser ? `Chatting with ${selectedUser.name}` : 'Select a contact to chat'}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`mb-2 max-w-xs p-2 rounded-xl text-sm ${
//                 msg.senderId === 'me' ? 'bg-[#DCF8C6] self-end ml-auto' : 'bg-gray-200'
//               }`}
//             >
//               {msg.content}
//               <div className="text-[10px] text-gray-500 text-right mt-1">
//                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t border-gray-200 flex items-center">
//           <input
//             className="flex-1 border rounded-lg px-4 py-2 mr-2 text-sm"
//             type="text"
//             placeholder="Type a message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useRef } from 'react';
// import io, { Socket } from 'socket.io-client';
// import axios from 'axios';
// import Link from 'next/link';

// const SOCKET_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com';
// const API_BASE = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat';

// interface User {
//   _id: string;
//   name: string;
// }

// interface Message {
//   senderId: string;
//   receiverId: string;
//   content: string;
//   timestamp: string | Date;
// }

// export default function ChatApp() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [sidebarVisible, setSidebarVisible] = useState(true); // State to toggle sidebar visibility
//   const socket = useRef<Socket | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }

//     socket.current = io(SOCKET_ENDPOINT);

//     socket.current.on('receive-message', (message: Message) => {
//       if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     fetchUsers(token);

//     return () => {
//       socket.current?.disconnect();
//     };
//   }, [selectedUser]);

//   const fetchUsers = async (token: string) => {
//     try {
//       const res = await axios.get(`${API_BASE}/get-messaged-users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error('Failed to fetch users', err);
//     }
//   };

//   const fetchMessages = async (userId: string) => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }
//     try {
//       const selected = users.find((u) => u._id === userId) || null;
//       setSelectedUser(selected);
//       const res = await axios.get(`${API_BASE}/get-messages/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(res.data.messages);
//     } catch (err) {
//       console.error('Failed to fetch messages', err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token not found. Please log in.');
//       return;
//     }

//     const payload = {
//       receiverId: selectedUser?._id!,
//       content: newMessage,
//     };

//     try {
//       await axios.post(`${SOCKET_ENDPOINT}/chat/send-message`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       socket.current?.emit('send-message', payload);
//       setMessages([...messages, { ...payload, senderId: 'me', timestamp: new Date() }]);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Failed to send message', err);
//     }
//   };

//   return (
//     <div className="flex h-screen font-sans relative">
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarVisible ? 'block w-4/5' : 'hidden'
//         } md:block w-[25%] bg-[#075E54] text-white p-4 overflow-y-auto`} // Sidebar covers 1/4 on large screens (md)
//       >
//         <h2 className="text-xl font-bold mb-4">Contacts</h2>
//         {Array.isArray(users) && users.map((user) => (
//           <div
//             key={user._id}
//             className={`p-2 rounded cursor-pointer hover:bg-[#0d7e6b] ${
//               selectedUser?._id === user._id ? 'bg-[#0d7e6b]' : ''
//             }`}
//             onClick={() => fetchMessages(user._id)}
//           >
//             {user.name}
//           </div>
//         ))}
//         <Link href="/" className="text-[0.87rem] text-center px-1 py-2 bg-blue-500 text-white rounded block mt-4 text-center">
//           Home
//         </Link>
//       </div>

//       {/* Toggle button for sidebar visibility */}
//       <button
//         className="md:hidden absolute top-4 left-3 z-10 bg-[#075E54] text-white p-2 rounded-md"
//         onClick={() => setSidebarVisible((prev) => !prev)} // Toggle sidebar visibility
//       >
//         {sidebarVisible ? 'Hide' : 'Show'} Sidebar
//       </button>

//       {/* Chat area */}
//       <div className="w-full md:w-3/4 flex flex-col bg-white">
//         {/* Chat header */}
//         <div
//           className={`p-4 border-b border-gray-200 font-medium text-[#333] ${
//             sidebarVisible ? 'pl-20' : 'pl-[2rem]'
//           }`} // Add padding left based on sidebar visibility
//         >
//           {selectedUser ? `Chatting with ${selectedUser.name}` : 'Select a contact to chat'}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`mb-2 max-w-xs p-2 rounded-xl text-sm ${
//                 msg.senderId === 'me' ? 'bg-[#DCF8C6] self-end ml-auto' : 'bg-gray-200'
//               }`}
//             >
//               {msg.content}
//               <div className="text-[10px] text-gray-500 text-right mt-1">
//                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t border-gray-200 flex items-center">
//           <input
//             className="flex-1 border rounded-lg px-4 py-2 mr-2 text-sm"
//             type="text"
//             placeholder="Type a message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import Link from 'next/link';

const SOCKET_ENDPOINT = 'https://lost-and-found-backend-v9hr.onrender.com';
const API_BASE = 'https://lost-and-found-backend-v9hr.onrender.com/api/v1/chat';
const SEND_MESSAGE_ENDPOINT = 'https://lost-and-found-backend-ydw0.onrender.com/chat/send-message';

interface User {
  _id: string;
  name: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string | Date;
}

export default function ChatApp() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const socket = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token not found. Please log in.');
      return;
    }

    socket.current = io(SOCKET_ENDPOINT, {
      auth: { token },
    });

    socket.current.on('receive-message', (message: Message) => {
      if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    fetchUsers(token);

    return () => {
      socket.current?.disconnect();
    };
  }, [selectedUser]);

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

  const fetchMessages = async (userId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token not found. Please log in.');
      return;
    }
    try {
      const selected = users.find((u) => u._id === userId) || null;
      setSelectedUser(selected);
      const res = await axios.get(`${API_BASE}/get-messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const token = localStorage.getItem('accessToken');
    if (!token || !selectedUser?._id) {
      console.error('Access token or receiver not found.');
      return;
    }

    const payload = {
      receiverId: selectedUser._id,
      content: newMessage,
    };

    try {
      await axios.post(SEND_MESSAGE_ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      socket.current?.emit('send-message', {
        ...payload,
        receiverId: selectedUser._id,
      });

      setMessages([...messages, { ...payload, senderId: 'me', timestamp: new Date() }]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

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
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 max-w-xs p-2 rounded-xl text-sm ${
                msg.senderId === 'me' ? 'bg-[#DCF8C6] self-end ml-auto' : 'bg-gray-200'
              }`}
            >
              {msg.content}
              <div className="text-[10px] text-gray-500 text-right mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
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
