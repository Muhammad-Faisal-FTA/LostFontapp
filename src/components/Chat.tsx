'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const socket: Socket = io('https://lost-and-found-backend-v9hr.onrender.com'); // Replace with your deployed backend URL

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive-message', (msg: Omit<Message, 'id'>) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          id: prev.length + 1,
        },
      ]);
    });

    // Cleanup
    return () => {
      socket.off('receive-message');
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const message = {
      sender: 'You',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Emit to server
    socket.emit('send-message', message);

    // Append locally
    setMessages((prev) => [...prev, { ...message, id: prev.length + 1 }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto mb-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow ${
                message.sender === 'You'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-right mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-shrink-0">
        <div className="flex items-center p-2 bg-white rounded-lg shadow">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
