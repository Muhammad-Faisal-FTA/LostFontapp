'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://lost-and-found-backend-v9hr.onrender.com'); // Replace with your deployed server URL

const SocketChat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('receive-message', (msg: string) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send-message', message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Real-time Chat</h2>
      <div className="border h-64 p-2 mb-2 overflow-y-auto bg-white shadow rounded">
        {chat.map((msg, idx) => (
          <div key={idx} className="text-sm mb-1">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SocketChat;
