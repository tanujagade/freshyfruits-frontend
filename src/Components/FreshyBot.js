import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://freshyfruits-backend.onrender.com";

const FreshyBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPill, setShowPill] = useState(true); // Manages the call-to-action prompt
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 🍏 Welcome to Freshy Fruits. I can help you with fruit health benefits, recipes, or general store policies. What is on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scrolling logic down to the freshest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPill(false); // Hide the prompt permanently once the chat opens
  };

  const handleSend = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    // 1. Append user message to state
    setMessages((prev) => [...prev, { sender: 'user', text: messageText }]);
    setIsLoading(true);

    try {
      // 2. Network post request to Express
     const response = await axios.post(
  `${BACKEND_URL}/api/chatbot/ask`,
  {
    userMessage: messageText,
  }
);

      // 3. Append bot response state
      setMessages((prev) => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "I ran into a small error. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput('');
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSend(suggestionText);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, fontFamily: '"Inter", "Segoe UI", sans-serif' }}>
      
      {/* 1. Floating Prompt Text Pill */}
      {showPill && !isOpen && (
        <div 
          onClick={toggleChat}
          style={{
            position: 'absolute', right: '75px', top: '10px', backgroundColor: '#1e293b',
            color: '#f8fafc', padding: '10px 16px', borderRadius: '20px', fontSize: '13px',
            fontWeight: '500', whiteSpace: 'nowrap', boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <span style={{ color: '#4CAF50' }}>●</span> Have questions? Ask me!
        </div>
      )}

      {/* 2. Primary Action Trigger Button */}
      <button 
        onClick={toggleChat}
        style={{
          backgroundColor: isOpen ? '#ef4444' : '#4CAF50', color: 'white', border: 'none', 
          borderRadius: '50%', width: '56px', height: '56px', fontSize: '22px', cursor: 'pointer', 
          boxShadow: '0px 6px 16px rgba(76, 175, 80, 0.3)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', transition: 'all 0.2s ease-in-out'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* 3. Main Chatbox Interface Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: '75px', right: '0', width: '360px', height: '500px',
          backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 12px 32px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9'
        }}>
          
          {/* Header Banner */}
          <div style={{ 
            backgroundColor: '#4CAF50', color: 'white', padding: '18px 20px', 
            display: 'flex', alignItems: 'center', gap: '12px' 
          }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '18px'
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Freshy Bot</div>
              <div style={{ fontSize: '11px', color: '#e8f5e9', marginTop: '2px' }}>AI Assistant • Online</div>
            </div>
          </div>

          {/* Interactive Message Feed Area */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    fontSize: '13.5px', lineHeight: '1.5', maxWith: '75%', maxWidth: '80%',
                    backgroundColor: isUser ? '#4CAF50' : '#ffffff',
                    color: isUser ? '#ffffff' : '#334155',
                    boxShadow: isUser ? '0px 2px 6px rgba(76,175,80,0.2)' : '0px 2px 6px rgba(0,0,0,0.04)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            
            {/* Dynamic Loading State Indicator */}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '6px' }}>
                <div style={{ padding: '10px 14px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0px 2px 6px rgba(0,0,0,0.04)', display: 'flex', gap: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Engagement Chips Container */}
          {messages.length === 1 && !isLoading && (
            <div style={{ backgroundColor: '#f8fafc', padding: '0px 20px 12px 20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleSuggestionClick("What fruits are high in Vitamin C?")}
                style={{ padding: '6px 12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '11px', cursor: 'pointer', color: '#475569', fontWeight: '500', transition: 'all 0.2s' }}
              >
                🍋 Vitamin C Fruits
              </button>
              <button 
                onClick={() => handleSuggestionClick("How should I store berries to keep them fresh?")}
                style={{ padding: '6px 12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '11px', cursor: 'pointer', color: '#475569', fontWeight: '500', transition: 'all 0.2s' }}
              >
                🍓 Storage Tips
              </button>
            </div>
          )}

          {/* Content Entry Form Controls */}
          <form onSubmit={handleSubmitForm} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid #f1f5f9', backgroundColor: '#ffffff' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '22px', outline: 'none', fontSize: '13px', backgroundColor: '#f8fafc', transition: 'border 0.2s' }}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              style={{ 
                marginLeft: '10px', width: '36px', height: '36px', borderRadius: '50%', 
                backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'
              }} 
              disabled={isLoading || !input.trim()}
            >
              ➔
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FreshyBot;