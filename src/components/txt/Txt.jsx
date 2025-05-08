import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import grandThertAuto from "../../assets/gta-logo-1.png";
import vigta6 from "../../assets/gta-6.png";
import txtBg from "../../assets/backiee-314918-landscape.jpg";

const TxtContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(35, 12, 51, 0.59), rgba(17, 17, 28, 0.64)), url(${txtBg}) no-repeat center/cover;
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

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
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
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 3rem 0 0 0;
  width: 100%;
  max-width: 600px;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  height: auto;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

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

const CardTxt = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1.5rem, 2vw, 1.8rem);
  font-weight: 700;
  color: #f7e7a1;
  text-shadow: 0 0 6px rgba(255, 77, 166, 0.4);
  margin: 0 0 0.5rem;
  letter-spacing: 0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  }
`;

const CardDescription = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  color: #d1d5db;
  line-height: 1.5;
  margin: 0 0 1rem;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  }
`;

const JoinButton = styled.button`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(247, 231, 161, 0.2);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(247, 231, 161, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: clamp(0.8rem, 0.9vw, 0.9rem);
  }
`;

// New components for flying pink elements
const FlyingElement = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #ff4da2, #ff007a);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 0, 128, 0.7), 0 0 30px rgba(255, 0, 128, 0.4);
  pointer-events: none;
  opacity: 0;
  z-index: 1;
`;

const StarElement = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #ff4da2;
  transform: rotate(0deg);
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.8));
  
  &:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 15px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #ff4da2;
  }
`;

const Txt = ({ chatBannerRef }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const flyingElementsRef = useRef([]);

  useEffect(() => {
    // Create flying elements
    const createFlyingElements = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const elementsCount = 10;

      // Clean up existing elements
      flyingElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      flyingElementsRef.current = [];

      // Create new elements
      for (let i = 0; i < elementsCount; i++) {
        // Create circles
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = `${Math.random() * 20 + 10}px`;
        element.style.height = element.style.width;
        element.style.background = `rgba(255, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 160) + 96}, ${Math.random() * 0.3 + 0.7})`;
        element.style.borderRadius = '50%';
        element.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.7), 0 0 30px rgba(255, 0, 128, 0.4)';
        element.style.pointerEvents = 'none';
        element.style.opacity = '0';
        element.style.zIndex = '1';
        container.appendChild(element);
        flyingElementsRef.current.push(element);

        // Create stars
        if (i % 2 === 0) {
          const star = document.createElement('div');
          star.style.position = 'absolute';
          star.style.width = '0';
          star.style.height = '0';
          star.style.borderLeft = '8px solid transparent';
          star.style.borderRight = '8px solid transparent';
          star.style.borderBottom = '16px solid #ff4da2';
          star.style.pointerEvents = 'none';
          star.style.opacity = '0';
          star.style.zIndex = '1';
          star.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 128, 0.8))';

          const afterPseudo = document.createElement('div');
          afterPseudo.style.position = 'absolute';
          afterPseudo.style.left = '-8px';
          afterPseudo.style.top = '12px';
          afterPseudo.style.borderLeft = '8px solid transparent';
          afterPseudo.style.borderRight = '8px solid transparent';
          afterPseudo.style.borderTop = '16px solid #ff4da2';

          star.appendChild(afterPseudo);
          container.appendChild(star);
          flyingElementsRef.current.push(star);
        }
      }

      // Animate flying elements
      flyingElementsRef.current.forEach((element, index) => {
        const delay = Math.random() * 3;
        const duration = Math.random() * 5 + 8;
        const isCircle = !element.hasChildNodes();

        const startX = Math.random() * window.innerWidth;
        const startY = container.offsetHeight + 50;
        const endX = Math.random() * window.innerWidth;
        const endY = -50;

        gsap.set(element, {
          x: startX,
          y: startY,
          opacity: 0,
          rotation: Math.random() * 360
        });

        gsap.to(element, {
          x: endX,
          y: endY,
          opacity: isCircle ? 0.7 : 0.5,
          rotation: `+=${Math.random() * 720 - 360}`,
          duration: duration,
          delay: delay,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(element, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                // Reset position for continuous animation
                gsap.set(element, {
                  x: Math.random() * window.innerWidth,
                  y: container.offsetHeight + 50,
                  opacity: 0,
                  rotation: Math.random() * 360
                });

                // Restart animation
                gsap.to(element, {
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: isCircle ? 0.7 : 0.5,
                  rotation: `+=${Math.random() * 720 - 360}`,
                  duration: duration,
                  delay: Math.random() * 2,
                  ease: 'power1.inOut',
                  repeat: -1,
                  repeatDelay: Math.random() * 2
                });
              }
            });
          }
        });
      });
    };

    // GSAP animations from ChatBanner.jsx
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }
    );

    const card = cardRef.current;
    if (card) {
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
        { threshold: 0.2, rootMargin: '-100px' }
      );

      card.dataset.index = 0;
      observer.observe(card);
    }

    // Particle effect from Main.jsx (ChatFooterParticle)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = containerRef.current.offsetHeight;
    };
    resizeCanvas();

    const particles = [];
    const particleCount = window.innerWidth < 640 ? 30 : 60;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(mouse, time) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size = this.baseSize + Math.sin(time * 0.0015 + this.phase) * 0.4;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            this.x -= dx / 80;
            this.y -= dy / 80;
            this.opacity = Math.min(this.opacity + 0.1, 0.7);
          } else {
            this.opacity = Math.max(this.opacity - 0.05, 0.2);
          }
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 77, 166, ${this.opacity})`;
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
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
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

    // Initialize flying elements
    createFlyingElements();

    // ResizeObserver for dynamic canvas height
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      createFlyingElements(); // Re-create flying elements on resize
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      // Clean up flying elements
      flyingElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  return (
    <TxtContainer ref={containerRef}>
      <ParticleCanvas ref={canvasRef} />
      <TitleContainer ref={titleRef}>
        <Title>Vice City Chat</Title>
      </TitleContainer>
      <CardGrid>
        <Card className="card" ref={cardRef} data-index="0">
          <CardTxt>
            <CardTitle>Welcome to Vice City's Underground Chat</CardTitle>
            <CardDescription>
              Join the wildest crew in GTA VI. Talk heists, flex your style, and own the neon streets. Stay sharp—cops are watching, but the chat never sleeps.
            </CardDescription>
            <JoinButton
              onClick={() => {
                chatBannerRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Jump In
            </JoinButton>
          </CardTxt>
        </Card>
      </CardGrid>
    </TxtContainer>
  );
};

export default Txt;