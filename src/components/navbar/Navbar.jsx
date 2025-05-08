import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { gsap } from 'gsap';
import { X, Menu, Close, Home, Chat, Explore } from '@mui/icons-material';

// Global keyframes for animations
const GlobalStyles = createGlobalStyle`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const StyledNavbar = styled.nav`
  width: 100%;
  padding: 1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.85), rgba(50, 20, 70, 0.9));
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    min-height: 60px;
  }
`;

const Logo = styled.div`
  font-family: 'Tilt Prism', sans-serif;
  font-size: clamp(1.5rem, 2vw, 1.8rem);
  font-weight: 400;
  color: #f7e7a1;
  text-shadow: 0 0 8px rgba(247, 231, 161, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 12px rgba(247, 231, 161, 0.7);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 1.8vw, 1.4rem);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  opacity: 1;
  visibility: visible;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, rgba(15, 10, 30, 0.95), rgba(50, 20, 70, 0.95));
    backdrop-filter: blur(10px);
    padding: 2rem 1.5rem;
    margin-top: 0;
    justify-content: flex-start;
    align-items: center;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    overflow-y: auto;
    gap: 1.5rem;
  }
`;

const NavButton = styled.button`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(247, 231, 161, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(247, 231, 161, 0.6), 0 0 20px rgba(124, 58, 237, 0.4);
    text-shadow: 0 0 8px rgba(247, 231, 161, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  .text {
    display: inline;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: clamp(1rem, 1.2vw, 1.1rem);
    width: 100%;
    max-width: 300px;
    justify-content: center;
    min-height: 48px;
  }
`;

const FollowButton = styled.a`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(247, 231, 161, 0.3);
  transition: all 0.3s ease;
  animation: pulse 2s infinite ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(247, 231, 161, 0.6), 0 0 20px rgba(124, 58, 237, 0.4);
    text-shadow: 0 0 8px rgba(247, 231, 161, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  .text {
    display: inline;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: clamp(1rem, 1.2vw, 1.1rem);
    width: 100%;
    max-width: 300px;
    justify-content: center;
    min-height: 48px;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: #f7e7a1;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }
`;

const Navbar = ({ bannerRef, chatRef, chatBannerRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinksRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    if (navLinksRef.current) {
      const links = navLinksRef.current.children;
      if (window.innerWidth > 768) {
        gsap.fromTo(
          links,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3,
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    if (navLinksRef.current && window.innerWidth <= 768) {
      if (isOpen) {
        gsap.fromTo(
          navLinksRef.current,
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        );
        gsap.fromTo(
          navLinksRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.2,
          }
        );
        gsap.to(hamburgerRef.current, {
          rotation: 90,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(navLinksRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
        gsap.to(hamburgerRef.current, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  }, [isOpen]);

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyles />
      <StyledNavbar>
        <Logo onClick={() => handleScroll(bannerRef)}>GTA 6 Intro</Logo>
        <Hamburger
          ref={hamburgerRef}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <Close /> : <Menu />}
        </Hamburger>
        <NavLinks isOpen={isOpen} ref={navLinksRef}>
          <NavButton type="button" onClick={() => handleScroll(bannerRef)}>
            <Home sx={{ fontSize: 24 }} />
            <span className="text">Home</span>
          </NavButton>
     
          <NavButton type="button" onClick={() => handleScroll(chatBannerRef)}>
            <Explore sx={{ fontSize: 24 }} />
            <span className="text">Capture</span>
          </NavButton>
          <FollowButton href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <X sx={{ fontSize: 24 }} />
            <span className="text">Follow Us</span>
          </FollowButton>
        </NavLinks>
      </StyledNavbar>
    </>
  );
};

export default Navbar;