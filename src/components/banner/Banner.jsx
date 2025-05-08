import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import grandThertAuto from "../../assets/gta-logo-1.png";
import vigta6 from "../../assets/gta-6.png";

gsap.registerPlugin(ScrollTrigger);

const BannerContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 80px 13rem 2rem;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 1rem 1rem;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 40%;
  gap: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    align-items: center;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 40%;
  gap: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    align-items: center;
  }
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 639px) {
    width: 150px;
  }
`;

const WatchTrailerButton = styled.button`
  padding: 0.8rem 2rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 600;
  text-transform: uppercase;
  color: #ffffff;
  background: #ae206e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(174, 32, 110, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(174, 32, 110, 0.6), 0 0 30px rgba(174, 32, 110, 0.4);
  }

  @media (max-width: 639px) {
    padding: 0.6rem 1.5rem;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
  }
`;

const Card = styled.div`
  background: ${props => props.background || 'linear-gradient(135deg, rgba(26, 14, 42, 0.22), rgba(60, 26, 90, 0.24))'};
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid ${props => props.borderColor || 'rgba(247, 231, 161, 0.2)'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  backdrop-filter: ${props => props.backdropFilter || 'blur(8px)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: scale(1.03);
    border-color: ${props => props.borderHoverColor || '#facc15'};
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
    padding: 1rem;
    max-width: 100%;
  }
`;

const TransparentCard = styled(Card)`
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;

  &:hover {
    box-shadow: none;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1.5rem, 2vw, 1.8rem);
  font-weight: 400;
  color: ${props => props.color || '#f7e7a1'};
  text-shadow: ${props => `0 0 6px ${props.color ? props.color + '66' : 'rgba(247, 231, 161, 0.4)'}`};
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  }
`;

const CardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  color: #d1d5db;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  }
`;

const Banner = ({ chatRef, chatBannerRef }) => {
  const containerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const cards = [
    {
      title: 'WELCOME TO VICE CITY',
      description:
        'Dive into Vice City’s neon nights! Join our chat server to rule the streets, plan heists, and vibe with the community in this iconic GTA hotspot.',
      titleColor: '#cc2777',
      borderColor: 'rgba(255, 77, 166, 0.3)',
      borderHoverColor: '#ff4da6',
    },
    {
      title: 'LATEST NEWS',
      description:
        'Stay in the loop! Get updates on server events, street races, and exclusive GTA community challenges. Join now to dominate the digital turf!',
      titleColor: '#ffffff',
      borderColor: 'rgba(0, 247, 255, 0.3)',
      borderHoverColor: '#00f7ff',
      background: '#cc2777',
    },
  ];

  useEffect(() => {
    // GSAP entrance animations
    gsap.fromTo(
      leftSectionRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );

    gsap.fromTo(
      rightSectionRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.4 }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 }
    );

    // Subtle parallax effect, disabled on mobile
    if (window.innerWidth > 768) {
      gsap.to(containerRef.current, {
        yPercent: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleScroll = () => {
    if (chatBannerRef && chatBannerRef.current) {
      chatBannerRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <BannerContainer ref={containerRef}>
      <LeftSection ref={leftSectionRef}>
        <LogoImage src={grandThertAuto} alt="Grand Theft Auto Logo" />
        <WatchTrailerButton ref={buttonRef}>Watch Trailer</WatchTrailerButton>
        <TransparentCard
          borderColor={cards[0].borderColor}
          borderHoverColor={cards[0].borderHoverColor}
        >
          <CardTitle color={cards[0].titleColor}>{cards[0].title}</CardTitle>
          <CardDescription>{cards[0].description}</CardDescription>
        </TransparentCard>
      </LeftSection>
      <RightSection ref={rightSectionRef}>
        <LogoImage src={vigta6} alt="GTA VI Logo" />
        <Card
          borderColor={cards[1].borderColor}
          borderHoverColor={cards[1].borderHoverColor}
          background={cards[1].background}
          backdropFilter="blur(8px)"
        >
          <CardTitle color={cards[1].titleColor}>{cards[1].title}</CardTitle>
          <CardDescription>{cards[1].description}</CardDescription>
        </Card>
      </RightSection>
    </BannerContainer>
  );
};

export default Banner;