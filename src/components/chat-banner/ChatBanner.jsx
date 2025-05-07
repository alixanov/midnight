import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ChatBannerImg from "../../assets/backiee-274909-landscape.jpg";
import LibertyCityImg from "../../assets/statue-of-liberty.png";
import BlaineCountyImg from "../../assets/mountain.png";
import ViceCityImg from "../../assets/beach.png";
import LosSantosImg from "../../assets/los-angeles.png";

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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.03) rotate(1deg);
    border-color: #facc15;
    box-shadow: 0 8px 25px rgba(247, 231, 161, 0.5), 0 0 15px rgba(124, 58, 237, 0.4);
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
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;
const CardTxt = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
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
  color: #f7e7a1;
  text-shadow: 0 0 6px rgba(247, 231, 161, 0.4);
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
  margin: 0;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  }
`;

const ChatBanner = ({ chatRef }) => {
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Animate title container
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }
    );

    // Animate cards with IntersectionObserver
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
      image: LosSantosImg,
      description: 'A bustling urban jungle where ambition and danger collide. Dive into the chaos of Midnight’s most vibrant chat server.',
    },
    {
      name: 'Liberty City',
      image: LibertyCityImg,
      description: 'Navigate the gritty streets of a city that never sleeps. Connect with rebels and dreamers in this iconic server.',
    },
    {
      name: 'Vice City',
      image: ViceCityImg,
      description: 'Dive into the neon-lit nightlife of Vice City. This server is your gateway to glamour and intrigue.',
    },
    {
      name: 'Blaine County',
      image: BlaineCountyImg,
      description: 'Escape to the wild, untamed landscapes of Blaine County. A server for those who thrive on adventure.',
    },
  ];

  return (
    <ChatBannerContainer ref={chatRef}>
      <TitleContainer ref={titleRef}>
        <PlatformName>Midnight</PlatformName>
        <Title>Online Chat Servers</Title>
      </TitleContainer>
      <CardGrid ref={gridRef}>
        {servers.map((server, index) => (
          <Card key={index} className="card">
            <CardImage src={server.image} alt={`${server.name} server`} />
           <CardTxt>
              <CardTitle>{server.name}</CardTitle>
              <CardDescription>{server.description}</CardDescription>
           </CardTxt>
          </Card>
        ))}
      </CardGrid>
    </ChatBannerContainer>
  );
};

export default ChatBanner;