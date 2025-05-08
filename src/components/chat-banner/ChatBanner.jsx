import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Lock } from '@mui/icons-material';
import LibertyCityImg from "../../assets/statue-of-liberty.png";
import BlaineCountyImg from "../../assets/mountain.png";
import ViceCityImg from "../../assets/beach.png";
import LosSantosImg from "../../assets/los-angeles.png";
import LosSantosBg from '../../assets/bg.png';
import LibertyCity from "../../assets/backiee-301324-landscape.jpg";
import MapCarLosSantosBg from '../../assets/Animation - 1746629343650 (1).json';
import MapCarLiberCity from "../../assets/map.json";
import grandThertAuto from "../../assets/gta-logo-1.png";
import vigta6 from "../../assets/gta-6.png";

const ChatBannerContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 13rem;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    gap: 0.5rem;
  }
`;

const LogoImage = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 100px;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0 0 0;
  width: 100%;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  height: 100px;
  background: #38153b;
  border-radius: 12px;
  padding: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
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
    padding: 0.5rem;
  }
`;

const CardTxt = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  padding-left: 1rem;
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid rgba(247, 231, 161, 0.3);

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 700;
  color: ${props => props.color || '#f7e7a1'};
  text-shadow: ${props => `0 0 6px ${props.color ? props.color + '80' : 'rgba(247, 231, 161, 0.4)'}`};
  margin: 0 0 0.2rem;
  letter-spacing: 0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 1.3vw, 1rem);
  }
`;

const CardDescription = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  font-weight: 700;
  color: #d1d5db;
  line-height: 1.2;
  margin: 0 0 0.3rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 1vw, 0.85rem);
  }
`;

const JoinButton = styled.button`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 0.9vw, 0.9rem);
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  color: #1f1f1f;
  background: ${props =>
    props.locked
      ? 'linear-gradient(45deg, #666, #888)'
      : 'linear-gradient(45deg, #f7e7a1, #facc15)'};
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.locked ? 'default' : 'pointer')};
  box-shadow: ${props =>
    props.locked
      ? '0 2px 6px rgba(0, 0, 0, 0.3)'
      : '0 3px 8px rgba(247, 231, 161, 0.2)'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.2rem;
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
    padding: 0.3rem 0.7rem;
    font-size: clamp(0.75rem, 0.85vw, 0.85rem);
  }
`;

const LockIcon = styled(Lock)`
  font-size: 12px !important;
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
      description: 'Chat room',
      locked: false,
      background: LosSantosBg,
      animation: MapCarLosSantosBg,
      color: '#facc15',
    },
    {
      name: 'Liberty City',
      city: 'Liberty City',
      image: LibertyCityImg,
      description: 'Chat room',
      locked: false,
      background: LibertyCity,
      animation: MapCarLiberCity,
      color: '#00f7ff',
    },
    {
      name: 'Vice City',
      image: ViceCityImg,
      description: 'Chat room',
      locked: true,
      color: '#ff4da6',
    },
    {
      name: 'Blaine County',
      image: BlaineCountyImg,
      description: 'Chat room',
      locked: true,
      color: '#00ff66',
    },
  ];

  const generateUsername = () => {
    const randomID = Math.floor(1000 + Math.random() * 9000);
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
        <LogoImage src={grandThertAuto} alt="Grand Theft Auto Logo" />
        <LogoImage src={vigta6} alt="GTA VI Logo" />
      </TitleContainer>
      <Title>Online Chat Servers</Title>
      <CardGrid ref={gridRef}>
        {servers.map((server, index) => {
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