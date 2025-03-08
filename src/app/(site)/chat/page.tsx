import React from 'react';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const messages: Message[] = [
    { id: 1, sender: 'Meera', text: "Hey! Don’t forget our pizza night at your place this Saturday. I’m bringing my famous veggie pizza...", timestamp: '3:17 PM' },
    { id: 2, sender: 'You', text: "Yes, I lost a brown leather wallet. It had my ID card and some cash inside.", timestamp: '3:25 PM' },
    { id: 3, sender: 'Meera', text: "I found this wallet near the bench in the park. Were you there at some point?", timestamp: '3:37 PM' },
    { id: 4, sender: 'You', text: "Yes, I was there yesterday evening. That’s probably when I lost it.", timestamp: '3:38 PM' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
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
            placeholder="Type a message"
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;