import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Home, ExitToApp } from '@mui/icons-material';
import { chatMessages } from '../data/ChatData';

const ChatContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
background: linear-gradient(90deg, rgba(32, 14, 48, 0.88) 10%, transparent 50%),
            linear-gradient(270deg, rgba(32, 14, 48, 0.86) 10%, transparent 50%),
            url(${props => props.chatBg});

  background-size: 100% 100%, 100% 100%, cover;
  background-position: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

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
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;

  & svg {
    color: #fff;
    font-size: 1.2rem;
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
  background: rgba(32, 14, 48, 0);
  border: 2px solid #690e4d;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2;

  @media (max-width: 768px) {
    height: 80vh;
    width: 95%;
    border-radius: 6px;
  }
`;

const WelcomeMessage = styled.div`
  font-family: "Pricedown";
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #fff;
  padding: 0.5rem;
  background: rgba(32, 14, 48, 0.9);
  border-bottom: 1px solid #690e4d;
  text-align: center;

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.2vw, 0.9rem);
    padding: 0.3rem;
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
    background: #690e4d;
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
  border: 1px solid #690e4d;
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

  @media (max-width: 768px) {
    padding: 0.3rem;
    border-radius: 4px;
  }
`;

const Username = styled.div`
  font-family: "Pricedown";
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #690e4d;
  font-weight: 400;
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  }
`;

const MessageText = styled.p`
  font-family: "Oswald-VariableFont";
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
  font-family: "Oswald-VariableFont";
  font-size: clamp(0.7rem, 0.9vw, 0.8rem);
  color: #a0a0a0;
  margin-left: 0.4rem;

  @media (max-width: 768px) {
    font-size: clamp(0.6rem, 0.8vw, 0.7rem);
    margin-left: 0.2rem;
  }
`;

const TypingIndicator = styled.div`
  font-family: "Pricedown";
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #690e4d;
  font-style: italic;
  padding: 0.5rem;
  background: rgba(32, 14, 48, 0.9);
  border-radius: 6px;
  border: 1px solid rgba(250, 208, 40, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  border-top: 1px solid #690e4d;
  position: sticky;
  bottom: 0;

  @media (max-width: 768px) {
    padding: 0.3rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-family: "Pricedown";
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #e0e0e0;
  background: rgba(32, 14, 48, 0.9);
  border: 1px solid #690e4d;
  border-radius: 4px;
  outline: none;

  @media (max-width: 768px) {
    padding: 0.3rem;
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  font-family: "Pricedown";
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #fff;
  background: #690e4d;
  border: noneguo
  border-radius: 4px;
  margin-left: 0.3rem;
  cursor: pointer;

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
    if (!city || !background) {
      navigate('/');
      return;
    }

    const fakeMessages = chatMessages.filter((msg) => msg.city === city || !msg.city);
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const cityMessages = storedMessages.filter((msg) => msg.city === city);
    const uniqueMessages = [
      ...fakeMessages,
      ...cityMessages.filter((msg) => !fakeMessages.some((fm) => fm.id === msg.id)),
    ].sort((a, b) => a.id - b.id);
    setMessages(uniqueMessages);

    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
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

    setMessages((prev) => [...prev, userMessage]);

    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    allMessages.push(userMessage);
    localStorage.setItem('messages', JSON.stringify(allMessages));

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
          <WelcomeMessage>
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