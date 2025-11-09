
import React, { useState, useRef, useEffect } from 'react';
import { createEcoSortChat } from '../services/geminiService';
import { Chat } from '@google/genai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const EcoChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createEcoSortChat();
    setMessages([{ text: "Hello! I'm EcoSort. Ask me anything about sustainability or recycling!", sender: 'bot' }]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: input });
      let botResponse = '';
      setMessages(prev => [...prev, { text: '', sender: 'bot' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { text: botResponse, sender: 'bot' };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center text-eco-text p-4 border-b">Ask EcoSort</h2>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
              msg.sender === 'user' ? 'bg-eco-green text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
              {loading && msg.sender === 'bot' && index === messages.length -1 && (
                <span className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask an eco-question..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-light"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-3 bg-eco-green text-white rounded-full p-2 hover:bg-eco-green-dark disabled:bg-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EcoChat;
