import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { gsap } from 'gsap';
import Lottie from 'react-lottie';
import { chatMessages } from '../data/ChatData';
import chatBg from '../../assets/bg.png';
import MapCar from '../../assets/Animation - 1746629343650 (1).json';

const GlobalStyles = createGlobalStyle`
  @keyframes glow {
    0% { box-shadow: 0 0 4px rgba(247, 231, 161, 0.2); }
    50% { box-shadow: 0 0 12px rgba(247, 231, 161, 0.5), 0 0 16px rgba(124, 58, 237, 0.3); }
    100% { box-shadow: 0 0 4px rgba(247, 231, 161, 0.2); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`;

const ChatContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.6), rgba(50, 20, 70, 0.7)), url(${chatBg});
  background-size: cover;
  background-position: center;
  display: flex;
  color: #fff;
  font-family: 'Inter', sans-serif;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChatPanel = styled.div`
  width: 40%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background: rgba(15, 10, 30, 0.8);
  backdrop-filter: blur(12px);
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 70vh;
    padding: 1rem;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(247, 231, 161, 0.1);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f7e7a1;
    border-radius: 2px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 0.75rem;
  background: rgba(30, 20, 50, 0.6);
  border-left: 3px solid #f7e7a1;
  padding: 10px 14px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  animation: glow 2.5s infinite ease-in-out;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    gap: 6px;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #f7e7a1;
  box-shadow: 0 0 6px rgba(247, 231, 161, 0.3);

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  color: #f7e7a1;
  text-shadow: 0 0 3px rgba(247, 231, 161, 0.4);
`;

const Text = styled.span`
  font-size: clamp(0.8rem, 0.85vw, 0.9rem);
  color: #d1d5db;
  margin-top: 3px;
  line-height: 1.4;
`;

const Time = styled.span`
  font-size: clamp(0.65rem, 0.75vw, 0.75rem);
  color: #94a3b8;
  margin-top: 3px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding: 0.4rem;
  background: rgba(15, 10, 30, 0.9);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.4rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  background: rgba(50, 20, 70, 0.8);
  color: #d1d5db;
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 12px rgba(247, 231, 161, 0.5);
    background: rgba(50, 20, 70, 0.95);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: clamp(0.8rem, 0.85vw, 0.9rem);
  }
`;

const SendButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 6px;
  color: #1f1f1f;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(247, 231, 161, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(247, 231, 161, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: clamp(0.8rem, 0.85vw, 0.9rem);
  }
`;

const AnimationPanel = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.7), rgba(50, 20, 70, 0.8));
  backdrop-filter: blur(12px);
  border-left: 2px solid #f7e7a1;
  box-shadow: 0 0 12px rgba(247, 231, 161, 0.3);
  position: relative;
  animation: pulse 4s infinite ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(247, 231, 161, 0.05), rgba(124, 58, 237, 0.05));
    opacity: 0.3;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 30vh;
    padding: 0.5rem;
    border-left: none;
    border-top: 2px solid #f7e7a1;
  }
`;

const LottieWrapper = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(247, 231, 161, 0.3);
`;

const Chat = ({ chatRef }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const animationRef = useRef(null);

  const userAvatar = 'https://i.pinimg.com/736x/2b/d7/8e/2bd78e36c66253b4eb55df8b8acc3dbc.jpg';

  const randomResponses = [
    'Yo, that’s wild! What’s next?',
    'Haha, love the vibe! Keep it up!',
    'No way, you serious? Spill the tea!',
    'Epic move, gamer! What’s your next play?',
    'Chill, I’m just cruising in the shadows.',
    'Bet, let’s crank up the chaos!',
    'Smooth talker! Got more of that?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    gsap.fromTo(
      animationRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        username: 'You',
        message: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: userAvatar,
      };

      const randomResponse = {
        id: messages.length + 2,
        username: `ShadowGamer${Math.floor(Math.random() * 100)}`,
        message: randomResponses[Math.floor(Math.random() * randomResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
      };

      setMessages([...messages, newUserMessage, randomResponse]);
      setInput('');

      gsap.fromTo(
        `.message-${newUserMessage.id}`,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        `.message-${randomResponse.id}`,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.2 }
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: MapCar,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <GlobalStyles />
      <ChatContainer ref={chatRef}>
        <ChatPanel>
          <MessagesContainer>
            {messages.map((msg) => (
              <Message key={msg.id} className={`message-${msg.id}`}>
                <Avatar src={msg.avatar} alt={msg.username} />
                <MessageContent>
                  <Username>{msg.username}</Username>
                  <Text>{msg.message}</Text>
                  <Time>{msg.time}</Time>
                </MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              aria-label="Chat message input"
            />
            <SendButton onClick={handleSendMessage} aria-label="Send message">
              Send
            </SendButton>
          </InputContainer>
        </ChatPanel>
        <AnimationPanel ref={animationRef}>
          <LottieWrapper>
            <Lottie options={lottieOptions} />
          </LottieWrapper>
        </AnimationPanel>
      </ChatContainer>
    </>
  );
};

export default Chat;