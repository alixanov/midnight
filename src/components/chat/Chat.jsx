import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { Home, ExitToApp } from '@mui/icons-material';
import { chatMessages } from '../data/ChatData';

// Pulsating border animation
const pulse = keyframes`
  0% { box-shadow: 0 0 5px #fad028, 0 0 10px rgba(250, 208, 40, 0.5); }
  50% { box-shadow: 0 0 10px #fad028, 0 0 20px rgba(250, 208, 40, 0.7); }
  100% { box-shadow: 0 0 5px #fad028, 0 0 10px rgba(250, 208, 40, 0.5); }
`;

// Typing dots animation
const typingDots = keyframes`
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  100% { content: '.'; }
`;

const ChatContainer = styled.section`
  min-height: 100vh;
  width: 100%;
    display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(32, 14, 48, 0.37), rgba(48, 21, 72, 0.41)), url(${props => props.chatBg});
  background-size: cover;
  background-position: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.7);
  transform: translate3d(0, 0, 0);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 100vh;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #200e30;
  border: 1px solid #fad028;
  border-radius: 50%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  backdrop-filter: blur(6px);

  & svg {
    color: #fad028;
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 8px rgba(250, 208, 40, 0.6);
    border-color: #fad028;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(250, 208, 40, 0.5);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.3rem;

    & svg {
      font-size: 0.9rem;
    }
  }
`;

const LogoutButton = styled(HomeButton)`
  left: auto;
  right: 0.75rem;

  @media (max-width: 768px) {
    right: 0.5rem;
  }
`;

const ChatWrapper = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 70vh;
  background:rgba(32, 14, 48, 0);
  border: 2px solid #fad028;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 2;
  animation: ${pulse} 2s infinite ease-in-out;

  @media (max-width: 768px) {
    height: 80vh;
    width: 95%;
    border-radius: 6px;
  }
`;

const WelcomeMessage = styled.div`
  font-family: 'Pricedown', 'Russo One', 'Impact', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #fad028;
  text-shadow: 0 0 8px rgba(250, 208, 40, 0.6);
  padding: 0.5rem;
  background: rgba(32, 14, 48, 0.9);
  border-bottom: 1px solid #fad028;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.2vw, 0.9rem);
    padding: 0.3rem;
    text-shadow: 0 0 5px rgba(250, 208, 40, 0.5);
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #fad028;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: #200e30;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.3rem;
    &::-webkit-scrollbar {
      width: 3px;
    }
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #fad028;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const MessageContent = styled.div`
  flex: 1;
  background: rgba(32, 14, 48, 0.9);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(250, 208, 40, 0.3);
  transition: all 0.2s ease;

  &:hover {
    border-color: #fad028;
    box-shadow: 0 0 8px rgba(250, 208, 40, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.3rem;
    border-radius: 4px;
    &:hover {
      box-shadow: 0 0 5px rgba(250, 208, 40, 0.4);
    }
  }
`;

const Username = styled.div`
  font-family: 'Pricedown', 'Russo One', 'Impact', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #fad028;
  font-weight: 400;
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  }
`;

const MessageText = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #e0e0e0;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
    line-height: 1.3;
  }
`;

const Timestamp = styled.span`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.7rem, 0.9vw, 0.8rem);
  color: #a0a0a0;
  margin-left: 0.4rem;

  @media (max-width: 768px) {
    font-size: clamp(0.6rem, 0.8vw, 0.7rem);
    margin-left: 0.2rem;
  }
`;

const TypingIndicator = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #fad028;
  font-style: italic;
  padding: 0.5rem;
  background: rgba(32, 14, 48, 0.9);
  border-radius: 6px;
  border: 1px solid rgba(250, 208, 40, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:after {
    content: '.';
    animation: ${typingDots} 1.5s infinite steps(1);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
    padding: 0.3rem;
    gap: 0.3rem;
  }
`;

const InputContainer = styled.form`
  display: flex;
  padding: 0.5rem;
  background: #200e30;
  border-top: 1px solid #fad028;
  position: sticky;
  bottom: 0;

  @media (max-width: 768px) {
    padding: 0.3rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #e0e0e0;
  background: rgba(32, 14, 48, 0.9);
  border: 1px solid #fad028;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #fad028;
    box-shadow: 0 0 6px rgba(250, 208, 40, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.3rem;
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #200e30;
  background: #fad028;
  border: none;
  border-radius: 4px;
  margin-left: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 8px rgba(250, 208, 40, 0.6);
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    width: 60px;
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
    margin-left: 0.2rem;
  }
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messageContainerRef = useRef(null);
  const welcomeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { background, city, username } = location.state || {};

  const currentUser = username || 'Guest';
  const randomResponses = [
    'Yo, that’s wild! Wanna squad up later? 😎',
    'Nice one! Have you checked the black market yet?',
    'Bet you’re dominating! Got any pro tips? 🔥',
    'Whoa, intense! You hitting the races tonight?',
    'Sweet move! DM me if you need a hacker. 💾',
    'Epic! Let’s grind some XP on the next mission.',
    'That’s the spirit! You in for the vault job?',
  ];

  useEffect(() => {
    // Redirect to home if state is missing
    if (!city || !background) {
      navigate('/');
      return;
    }

    // Initialize with fake data from chatMessages
    const fakeMessages = chatMessages.filter((msg) => msg.city === city || !msg.city);
    // Load stored messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const cityMessages = storedMessages.filter((msg) => msg.city === city);
    // Merge fake and stored messages, removing duplicates by id
    const uniqueMessages = [
      ...fakeMessages,
      ...cityMessages.filter((msg) => !fakeMessages.some((fm) => fm.id === msg.id)),
    ].sort((a, b) => a.id - b.id);
    setMessages(uniqueMessages);

    // Scroll to bottom
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    // GSAP animations
    gsap.fromTo(
      messageContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    );
  }, [city, background, navigate]);

  const formatDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    return `${date} ${time}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      username: currentUser,
      avatar: 'https://i.pinimg.com/736x/c9/d7/8e/c9d78eaa7438bfc8cc828144f56e4366.jpg',
      message: input,
      time: formatDateTime(),
      city,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Persist user message in localStorage
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    allMessages.push(userMessage);
    localStorage.setItem('messages', JSON.stringify(allMessages));

    // Simulate bot typing
    setIsBotTyping(true);
    setTimeout(() => {
      const randomResponse = {
        id: Date.now() + 1,
        username: 'MidnightBot',
        avatar: 'https://i.pinimg.com/736x/fd/92/27/fd922726ad4fe78103179165c169d08e.jpg',
        message: randomResponses[Math.floor(Math.random() * randomResponses.length)],
        time: formatDateTime(),
        city,
      };

      setMessages((prev) => [...prev, randomResponse]);
      setIsBotTyping(false);

      // Persist bot response in localStorage
      allMessages.push(randomResponse);
      localStorage.setItem('messages', JSON.stringify(allMessages));
    }, 1500);

    setInput('');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <ChatContainer chatBg={background}>
      <HomeButton onClick={() => navigate('/')} aria-label="Go to home">
        <Home />
      </HomeButton>
  
      <ChatWrapper>
        {city && (
          <WelcomeMessage ref={welcomeRef}>
            Welcome to {city} Chat, {currentUser}!
          </WelcomeMessage>
        )}
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
          {isBotTyping && (
            <Message>
              <Avatar
                src="https://i.pinimg.com/736x/fd/92/27/fd922726ad4fe78103179165c169d08e.jpg"
                alt="MidnightBot's avatar"
              />
              <TypingIndicator>MidnightBot is typing</TypingIndicator>
            </Message>
          )}
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