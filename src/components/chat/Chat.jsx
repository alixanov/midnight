import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import chatBg from '../../assets/bg.png';
import MapCar from '../../assets/Animation - 1746629343650 (1).json';
import { chatMessages } from '../data/ChatData';

const ChatContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.75), rgba(50, 20, 70, 0.8)), url(${chatBg});
  background-size: cover;
  background-position: center;
  display: flex;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.6);
  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    min-height: 80vh;
  }
`;

const AnimationContainer = styled.div`
  flex: 1;
  max-width: 40%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 30vh;
    margin-bottom: 1rem;
  }
`;

const ChatWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 80vh;
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.22), rgba(60, 26, 90, 0.24));
  border-radius: 12px;
  border: 2px solid rgba(247, 231, 161, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2;

  @media (max-width: 768px) {
    height: 50vh;
    flex: 1;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #facc15;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #facc15;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const MessageContent = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.27);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(247, 231, 161, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: #facc15;
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.4);
  }
`;

const Username = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #f7e7a1;
  font-weight: 400;
  margin-bottom: 0.25rem;
`;

const MessageText = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #d1d5db;
  margin: 0;
  line-height: 1.5;
`;

const Timestamp = styled.span`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.75rem, 1vw, 0.85rem);
  color: #8b8b8b;
  margin-left: 0.5rem;
`;

const InputContainer = styled.form`
  display: flex;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border-top: 1px solid #facc15;
  position: sticky;
  bottom: 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #d1d5db;
  background: rgba(26, 14, 42, 0.9);
  border: 1px solid #facc15;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #f7e7a1;
    box-shadow: 0 0 8px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 6px;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Chat = () => {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const messageContainerRef = useRef(null);
  const animationRef = useRef(null);

  const randomResponses = [
    'Yo, that’s wild! Wanna squad up later? 😎',
    'Nice one! Have you checked the black market yet?',
    'Bet you’re dominating! Got any pro tips? 🔥',
    'Whoa, intense! You hitting the races tonight?',
    'Sweet move! DM me if you need a hacker. 💾',
    'Epic! Let’s grind some XP on the next mission.',
    'That’s the spirit! You in for the vault job?',
  ];

  const formatDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().slice(0, 5); // HH:mm
    return `${date} ${time}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      username: 'You',
      avatar: 'https://i.pinimg.com/736x/c9/d7/8e/c9d78eaa7438bfc8cc828144f56e4366.jpg',
      message: input,
      time: formatDateTime(),
    };

    // Add random response
    const randomResponse = {
      id: messages.length + 2,
      username: 'MidnightBot',
      avatar: 'https://i.pinimg.com/736x/fd/92/27/fd922726ad4fe78103179165c169d08e.jpg',
      message: randomResponses[Math.floor(Math.random() * randomResponses.length)],
      time: formatDateTime(),
    };

    setMessages([...messages, userMessage, randomResponse]);
    setInput('');
  };

  useEffect(() => {
    // Scroll to bottom of messages
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    // Animate chat container
    gsap.fromTo(
      messageContainerRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    );

    // Animate Lottie container
    gsap.fromTo(
      animationRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    );
  }, [messages]);

  return (
    <ChatContainer>
      <AnimationContainer ref={animationRef}>
        <Lottie animationData={MapCar} loop={true} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </AnimationContainer>
      <ChatWrapper>
        <MessageContainer ref={messageContainerRef}>
          {messages.map((msg) => (
            <Message key={msg.id}>
              <Avatar src={msg.avatar} alt={`${msg.username}'s avatar`} />
              <MessageContent>
                <Username>
                  {msg.username} <Timestamp>{msg.time}</Timestamp>
                </Username>
                <MessageText>{msg.message}</MessageText>
              </MessageContent>
            </Message>
          ))}
        </MessageContainer>
        <InputContainer onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            aria-label="Chat message input"
          />
          <SendButton type="submit" aria-label="Send message">Send</SendButton>
        </InputContainer>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default Chat;