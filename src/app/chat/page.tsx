'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample user data with avatars and last message snippets
const initialUsers = [
  {
    id: 1,
    name: 'You',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  }, // Current user
  {
    id: 2,
    name: 'User Two',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
  {
    id: 3,
    name: 'User Three',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
  {
    id: 4,
    name: 'User Four',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
  {
    id: 5,
    name: 'User Five',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
  {
    id: 6,
    name: 'User Six',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
  {
    id: 7,
    name: 'User Seven',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: '',
  },
];

const Page: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [messagesByUser, setMessagesByUser] = useState({}); // Store messages by user ID
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(users[1]); // Default to User Two
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user's message
      const newMessage = { userId: 1, text: inputValue };

      // Update messages for the selected user
      setMessagesByUser((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
      }));

      // Update the last message snippet for the selected user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, lastMessage: inputValue }
            : user
        )
      );

      setInputValue('');

      // Simulate receiving a response after a delay
      setTimeout(() => {
        const replyMessage = {
          userId: selectedUser.id,
          text: `Reply from ${selectedUser.name}: ${inputValue}`,
        };

        // Update messages for the selected user with the reply
        setMessagesByUser((prev) => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || []), replyMessage],
        }));

        // Update the last message snippet for the selected user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, lastMessage: replyMessage.text }
              : user
          )
        );
      }, 1000);
    }
  };

  // Scroll to the bottom of the chat area whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesByUser[selectedUser.id]]); // Only trigger when messages for the selected user change

  return (
    <div className="flex flex-1 h-screen">
      {/* Sidebar for User List */}
      <div className="w-1/4 border-r">
        <h2 className="font-bold p-4">Users</h2>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className={`flex text-sm items-center p-2 hover:bg-gray-200 cursor-pointer ${selectedUser.id === user.id ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">
                  <span>{user.name}</span>
                  {/* Displaying the last message snippet */}
                  {user.lastMessage && (
                    <div className="text-gray-500 text-xs">
                      {user.lastMessage}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 flex flex-col">
        <h2 className="font-bold mb-2">Chat with {selectedUser.name}</h2>
        <div
          className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded-lg mb-4 bg-white"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {(messagesByUser[selectedUser.id] || []).map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.userId === 1 ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`flex items-center ${msg.userId === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar for the current user */}
                {msg.userId === 1 && (
                  <img
                    src={users[0].avatar}
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
                {/* Avatar for the selected user */}
                {msg.userId !== 1 && (
                  <img
                    src={selectedUser.avatar}
                    alt={`${selectedUser.name}'s avatar`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                {/* Message bubble */}
                <div
                  className={`p-3 text-sm rounded-lg max-w-xs ${msg.userId === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {/* Empty div to act as a scroll target */}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="flex">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 mr-2"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
