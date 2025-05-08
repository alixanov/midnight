import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgBanner from "../../assets/backiee-314918-landscape.jpg";

gsap.registerPlugin(ScrollTrigger);

const BannerContainer = styled.div`
  min-height: calc(100vh);
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.85), rgba(50, 20, 70, 0.9)), url(${bgBanner});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 60px 2rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.7);
  transform: translate3d(0, 0, 0);
  opacity: 1;

  @media (max-width: 639px) {
    padding: 60px 1rem 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 400;
  color: #f7e7a1;
  text-shadow: 0 0 15px rgba(247, 231, 161, 0.8), 0 0 25px rgba(124, 58, 237, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 3rem);
  }
`;

const Version = styled.span`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(3.5rem, 9vw, 6rem);
  color: #facc15;
  text-shadow: 0 0 20px rgba(250, 204, 21, 0.9), 0 0 30px rgba(124, 58, 237, 0.7);
  letter-spacing: 0.05em;
  transform: skew(-10deg);
  background: linear-gradient(45deg, #facc15, #f7e7a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 7vw, 3.5rem);
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 400;
  margin: 0.5rem 0;
  max-width: 700px;
  line-height: 1.8;
  color: #d1d5db;
  z-index: 2;

  @media (max-width: 639px) {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    max-width: 90%;
  }
`;

const ActionButton = styled.button`
  margin: 1rem 0;
  padding: 0.8rem 2rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 600;
  text-transform: uppercase;
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(247, 231, 161, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(247, 231, 161, 0.6), 0 0 30px rgba(124, 58, 237, 0.4);
  }

  @media (max-width: 639px) {
    padding: 0.6rem 1.5rem;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem 0;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.22), rgba(60, 26, 90, 0.24));
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid ${props => props.borderColor || 'rgba(247, 231, 161, 0.2)'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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

/* Optional: Tinted CardDescription
const CardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  color: ${props => props.color || '#d1d5db'};
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  }
`;
*/

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Banner = ({ chatRef, chatBannerRef }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const cardGridRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const cards = [
    {
      title: 'WELCOME TO VICE CITY',
      description:
        'Neon lights pulse through Vice City’s vibrant streets, where fast cars, shady deals, and nightlife reign. From beachfront heists to rooftop chases, every corner hides a story of ambition, betrayal, and survival. Join the chaos, rule the night, and carve your name in this electrifying underworld.',
      titleColor: '#ff4da6', // Pink for Vice City nightlife
      borderColor: 'rgba(255, 77, 166, 0.3)', // Subtle pink border
      borderHoverColor: '#ff4da6', // Bright pink on hover
      // descriptionColor: '#ffb3d9', // Optional: Light pink for description
    },
    {
      title: 'LATEST NEWS',
      description:
        'GTA VI unveils new missions in Vice City’s sprawling open world. Expect high-stakes heists, dynamic NPC interactions, and a revamped multiplayer mode. Leaked trailers hint at dual protagonists and a darker storyline. Stay tuned for beta access details and exclusive in-game rewards dropping soon.',
      titleColor: '#00f7ff', // Cyan for dynamic news
      borderColor: 'rgba(0, 247, 255, 0.3)', // Subtle cyan border
      borderHoverColor: '#00f7ff', // Bright cyan on hover
      // descriptionColor: '#b3f5ff', // Optional: Light cyan for description
    },
  ];

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = bgBanner;

    // GSAP animations
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.4 }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 }
    );

    // Animate cards
    const cards = cardGridRef.current?.querySelectorAll('.card');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.8,
        }
      );
    }

    // Parallax effect
    gsap.to(containerRef.current, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Particle effect
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 640 ? 50 : 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(mouse, time) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size = this.baseSize + Math.sin(time * 0.002 + this.phase) * 0.5;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            this.x -= dx / 60;
            this.y -= dy / 60;
            this.opacity = Math.min(this.opacity + 0.1, 0.8);
          } else {
            this.opacity = Math.max(this.opacity - 0.05, 0.3);
          }
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(247, 231, 161, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: null, y: null };
    let time = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      particles.forEach((particle) => {
        particle.update(mouse, time);
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
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
      <ParticleCanvas ref={canvasRef} />
      <TitleContainer ref={titleRef}>
        <Title>GTA</Title>
        <Version>VI</Version>
        <Title>INTRO</Title>
      </TitleContainer>
      <Subtitle ref={subtitleRef}>
        Dive into a neon-lit underworld where ambition fuels chaos. From Vice City’s vibrant streets to shadowy deals, forge your legacy in a world of betrayal and power.
      </Subtitle>
      <ActionButton ref={buttonRef} onClick={handleScroll}>Enter the Abyss</ActionButton>
      <CardGrid ref={cardGridRef}>
        {cards.map((card, index) => (
          <Card
            key={index}
            className="card"
            borderColor={card.borderColor}
            borderHoverColor={card.borderHoverColor}
          >
            <CardTitle color={card.titleColor}>{card.title}</CardTitle>
            <CardDescription /* color={card.descriptionColor} */>
              {card.description}
            </CardDescription>
          </Card>
        ))}
      </CardGrid>
    </BannerContainer>
  );
};

export default Banner;