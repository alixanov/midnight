import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Lock } from '@mui/icons-material';
import ChatBannerImg from "../../assets/backiee-274909-landscape.jpg";
import LibertyCityImg from "../../assets/statue-of-liberty.png";
import BlaineCountyImg from "../../assets/mountain.png";
import ViceCityImg from "../../assets/beach.png";
import LosSantosImg from "../../assets/los-angeles.png";
import LosSantosBg from '../../assets/bg.png';
import LibertyCity from "../../assets/backiee-301324-landscape.jpg";
import MapCarLosSantosBg from '../../assets/Animation - 1746629343650 (1).json';
import MapCarLiberCity from "../../assets/map.json";

const ChatBannerContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.75), rgba(50, 20, 70, 0.8)), url(${ChatBannerImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.6);
  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  z-index: 2;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PlatformName = styled.h1`
  font-family: 'Tilt Prism', sans-serif;
  font-size: clamp(2.2rem, 6.5vw, 3.8rem);
  font-weight: 400;
  color: #f7e7a1;
  text-shadow: 0 0 15px rgba(247, 231, 161, 0.6), 0 0 25px rgba(124, 58, 237, 0.4);
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 4.5vw, 2.3rem);
  }
`;

const Title = styled.h2`
  font-family: 'Tilt Prism', sans-serif;
  font-size: clamp(1.6rem, 4.5vw, 2.8rem);
  font-weight: 400;
  text-transform: uppercase;
  color: #facc15;
  text-shadow: 0 0 12px rgba(247, 231, 161, 0.5), 0 0 20px rgba(124, 58, 237, 0.3);
  margin: 0;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 2rem;
  width: 100%;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.1), rgba(60, 26, 90, 0.31));
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  border: 2px solid rgba(247, 231, 161, 0.2);
  box-shadow: 0 4px 15px ${props => props.shadowColor || 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: ${props => (props.locked ? 'default' : 'pointer')};
  opacity: ${props => (props.locked ? 0.6 : 1)};

  &:hover {
    ${props =>
    !props.locked &&
    `
      transform: scale(1.03) rotate(1deg);
      border-color: ${props.borderHoverColor || '#facc15'};
      box-shadow: 0 8px 25px ${props => props.shadowColor || 'rgba(247, 231, 161, 0.5)'}, 0 0 15px ${props => props.shadowColor ? props.shadowColor + '66' : 'rgba(124, 58, 237, 0.4)'};
    `}
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(247, 231, 161, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    ${props => !props.locked && `opacity: 1;`}
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardTxt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const CardImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(247, 231, 161, 0.3);

  @media (max-width: 768px) {
    height: 160px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  font-weight: 400;
  color: ${props => props.color || '#f7e7a1'};
  text-shadow: ${props => `0 0 6px ${props.color ? props.color + '80' : 'rgba(247, 231, 161, 0.4)'}`};
  margin: 0 0 0.8rem;
  letter-spacing: 0.03em;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 1.6vw, 1.2rem);
  }
`;

const CardDescription = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  color: #d1d5db;
  line-height: 1.5;
  margin: 0 0 1rem;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  }
`;

const JoinButton = styled.button`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  font-weight: 400;
  padding: 0.6rem 1.2rem;
  color: #1f1f1f;
  background: ${props =>
    props.locked
      ? 'linear-gradient(45deg, #666, #888)'
      : 'linear-gradient(45deg, #f7e7a1, #facc15)'};
  border: none;
  border-radius: 6px;
  cursor: ${props => (props.locked ? 'default' : 'pointer')};
  box-shadow: ${props =>
    props.locked
      ? '0 2px 6px rgba(0, 0, 0, 0.3)'
      : '0 3px 8px rgba(247, 231, 161, 0.2)'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  opacity: ${props => (props.locked ? 0.7 : 1)};

  &:hover {
    ${props =>
    !props.locked &&
    `
      transform: translateY(-1px);
      box-shadow: 0 0 12px rgba(247, 231, 161, 0.5);
    `}
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: clamp(0.8rem, 0.85vw, 0.9rem);
    min-height: 40px;
  }
`;

const LockIcon = styled(Lock)`
  font-size: 16px !important;
  color: #d1d5db;
`;

const ChatBanner = ({ chatRef }) => {
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }
    );

    const cards = gridRef.current?.querySelectorAll('.card');
    if (cards) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: 'power3.out',
                  delay: entry.target.dataset.index * 0.15,
                }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      cards.forEach((card, index) => {
        card.dataset.index = index;
        observer.observe(card);
      });
      return () => cards.forEach((card) => observer.unobserve(card));
    }
  }, []);

  const servers = [
    {
      name: 'Los Santos',
      city: 'Los Santos',
      image: LosSantosImg,
      description: 'A bustling urban jungle where ambition and danger collide. Dive into the chaos of Midnight’s most vibrant chat server.',
      locked: false,
      background: LosSantosBg,
      animation: MapCarLosSantosBg,
      color: '#facc15', // Yellow for vibrant urban feel
    },
    {
      name: 'Liberty City',
      city: 'Liberty City',
      image: LibertyCityImg,
      description: 'Navigate the gritty streets of a city that never sleeps. Connect with rebels and dreamers in this iconic server.',
      locked: false,
      background: LibertyCity,
      animation: MapCarLiberCity,
      color: '#00f7ff', // Cyan for gritty, futuristic vibe
    },
    {
      name: 'Vice City',
      image: ViceCityImg,
      description: 'Dive into the neon-lit nightlife of Vice City. This server is your gateway to glamour and intrigue.',
      locked: true,
      color: '#ff4da6', // Pink for neon nightlife
    },
    {
      name: 'Blaine County',
      image: BlaineCountyImg,
      description: 'Escape to the wild, untamed landscapes of Blaine County. A server for those who thrive on adventure.',
      locked: true,
      color: '#00ff66', // Green for natural landscapes
    },
  ];

  const generateUsername = () => {
    const randomID = Math.floor(1000 + Math.random() * 9000); // 4-digit ID
    return `Player${randomID}`;
  };

  const handleCardClick = (locked, background, animation, city) => {
    if (!locked) {
      const username = generateUsername();
      navigate('/chat-room', { state: { background, animation, city, username } });
    }
  };

  return (
    <ChatBannerContainer ref={chatRef}>
      <TitleContainer ref={titleRef}>
        <PlatformName>GTA VI INTRO</PlatformName>
        <Title>Online Chat Servers</Title>
      </TitleContainer>
      <CardGrid ref={gridRef}>
        {servers.map((server, index) => {
          // Convert hex color to rgba with 0.5 opacity for default shadow
          const rgb = server.color.match(/[A-Za-z0-9]{2}/g).map(hex => parseInt(hex, 16));
          const shadowColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`;

          return (
            <Card
              key={index}
              className="card"
              locked={server.locked}
              shadowColor={shadowColor}
              borderHoverColor={server.color}
              onClick={() => handleCardClick(server.locked, server.background, server.animation, server.city)}
            >
              <CardImage src={server.image} alt={`${server.name} server`} />
              <CardTxt>
                <CardTitle color={server.color}>{server.name}</CardTitle>
                <CardDescription>{server.description}</CardDescription>
                <JoinButton
                  locked={server.locked}
                  onClick={() => handleCardClick(server.locked, server.background, server.animation, server.city)}
                  disabled={server.locked}
                >
                  {server.locked ? (
                    <>
                      <LockIcon />
                      Locked
                    </>
                  ) : (
                    'Join Server'
                  )}
                </JoinButton>
              </CardTxt>
            </Card>
          );
        })}
      </CardGrid>
    </ChatBannerContainer>
  );
};

export default ChatBanner;