import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgBanner from "../../assets/backiee-314918-landscape.jpg";


gsap.registerPlugin(ScrollTrigger);

const BannerContainer = styled.div`
  height: 100vh;
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
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.7); /* Vignette effect */
  transform: translate3d(0, 0, 0); /* Enable hardware acceleration */

  @media (max-width: 639px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Tilt Prism', sans-serif;
  font-size: clamp(5.2rem, 6.5vw, 3.8rem);
  font-weight: 400;
  color: #f7e7a1;
  text-shadow: 0 0 15px rgba(247, 231, 161, 0.6), 0 0 25px rgba(124, 58, 237, 0.4);
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 4.5vw, 2.3rem);
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 400;
  margin-top: 1.5rem;
  max-width: 700px;
  line-height: 1.8;
  color: #d1d5db;
  z-index: 2;

  @media (max-width: 639px) {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    max-width: 90%;
    margin-top: 1rem;
  }
`;

const ActionButton = styled.button`
  margin-top: 2.5rem;
  padding: 1rem 2.5rem;
  font-family: 'Inter', sans-serif;
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
    padding: 0.8rem 2rem;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
  }
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Banner = ({ chatRef }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.in' }
    );

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.3 }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.6 }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 }
    );

    // Parallax effect with ScrollTrigger
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
    const particleCount = window.innerWidth < 640 ? 50 : 100; // Fewer particles on mobile

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
        this.size = this.baseSize + Math.sin(time * 0.002 + this.phase) * 0.5; // Oscillating size

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
    if (chatRef && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <BannerContainer ref={containerRef}>
      <ParticleCanvas ref={canvasRef} />
      <Title ref={titleRef}>MIDNIGHT</Title>
      <Subtitle ref={subtitleRef}>
        Step into the shadows of an unforgiving city where every street tells a story —
        of betrayal, ambition, and survival. Build your empire, bend the rules, and leave
        your mark in this modern gothic underworld.
      </Subtitle>
      <ActionButton ref={buttonRef} onClick={handleScroll}>Enter the Abyss</ActionButton>
    </BannerContainer>
  );
};

export default Banner;