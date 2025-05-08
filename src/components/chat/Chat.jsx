import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Home, ExitToApp } from '@mui/icons-material';
import { chatMessages } from '../data/ChatData';

const ChatContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.12), rgba(50, 20, 70, 0.16)), url(${props => props.chatBg});
  background-size: cover;
  background-position: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.6);
  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    padding: 0.75rem;
    min-height: 100vh;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(26, 14, 42, 0.9);
  border: 1px solid #facc15;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  backdrop-filter: blur(4px);

  & svg {
    color: #facc15;
    font-size: 1.5rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.5);
    border-color: #f7e7a1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.3rem;

    & svg {
      font-size: 1rem;
    }
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(26, 14, 42, 0.9);
  border: 1px solid #facc15;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  backdrop-filter: blur(4px);

  & svg {
    color: #facc15;
    font-size: 1.5rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.5);
    border-color: #f7e7a1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.3rem;

    & svg {
      font-size: 1rem;
    }
  }
`;

const ChatWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  height: 90vh;
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.22), rgba(60, 26, 90, 0.24));
  border-radius: 12px;
  border: 2px solid rgba(247, 231, 161, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2;

  @media (max-width: 768px) {
    height: 95vh;
    border-radius: 8px;
  }
`;

const WelcomeMessage = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  color: #facc15;
  text-shadow: 0 0 6px rgba(247, 231, 161, 0.4);
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #facc15;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    padding: 0.5rem;
    text-shadow: 0 0 4px rgba(247, 231, 161, 0.3);
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
    padding: 0.75rem;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #facc15;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
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

  @media (max-width: 768px) {
    padding: 0.5rem;
    border-radius: 6px;
    &:hover {
      box-shadow: 0 0 5px rgba(247, 231, 161, 0.3);
    }
  }
`;

const Username = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #f7e7a1;
  font-weight: 400;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1vw, 0.9rem);
  }
`;

const MessageText = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #d1d5db;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.95vw, 0.85rem);
    line-height: 1.4;
  }
`;

const Timestamp = styled.span`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.75rem, 1vw, 0.85rem);
  color: #8b8b8b;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    font-size: clamp(0.65rem, 0.85vw, 0.75rem);
    margin-left: 0.3rem;
  }
`;

const TypingIndicator = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #8b8b8b;
  font-style: italic;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.27);
  border-radius: 8px;
  border: 1px solid rgba(247, 231, 161, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.95vw, 0.85rem);
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

const InputContainer = styled.form`
  display: flex;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border-top: 1px solid #facc15;
  position: sticky;
  bottom: 0;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
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
    padding: 0.4rem;
    font-size: clamp(0.75rem, 0.95vw, 0.85rem);
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
    padding: 0.4rem 0.8rem;
    width: 80px;
    font-size: clamp(0.75rem, 0.95vw, 0.85rem);
    margin-left: 0.3rem;
    &:hover {
      box-shadow: 0 0 5px rgba(247, 231, 161, 0.3);
    }
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
  const { background, city } = location.state || {};

  const currentUser = localStorage.getItem('currentUser') || 'Guest';
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
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
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
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <ChatContainer chatBg={background}>
      <HomeButton onClick={() => navigate('/')} aria-label="Go to home">
        <Home />
      </HomeButton>
      <LogoutButton onClick={handleLogout} aria-label="Logout">
        <ExitToApp />
      </LogoutButton>
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
              <TypingIndicator>MidnightBot is typing...</TypingIndicator>
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