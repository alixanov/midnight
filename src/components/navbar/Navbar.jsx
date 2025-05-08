import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { gsap } from 'gsap';
import { Home as HomeIcon, CameraAlt as CameraAltIcon, RssFeed as RssFeedIcon } from '@mui/icons-material';
import logo from "../../assets/gta-logo.png";

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
  padding: 1rem 13rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.isScrolled
    ? 'linear-gradient(135deg, #230c33, rgba(17, 17, 28, 0.9))'
    : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 4px 15px rgba(0, 0, 0, 0.5)' : 'none'};
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    background: transparent;
    backdrop-filter: none;
    box-shadow: ${props => props.isScrolled ? '0 2px 6px rgba(250, 204, 21, 0.2)' : 'none'};
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: clamp(40px, 10vw, 45px);
  }

  &:hover {
    img {
      filter: drop-shadow(0 0 6px rgba(247, 231, 161, 0.6));
    }
  }

  @media (max-width: 768px) {
    img {
      width: clamp(32px, 8vw, 36px);
    }
  }

  @media (max-width: 480px) {
    img {
      width: 32px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    gap: 0.5rem;
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const NavButton = styled.button`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  background: transparent;
  border: 1px solid rgba(247, 231, 161, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    color: #facc15;
    background: linear-gradient(45deg, rgba(250, 204, 21, 0.2), rgba(255, 77, 166, 0.2));
    box-shadow: 0 0 12px rgba(250, 204, 21, 0.6);
    animation: pulse 1.5s infinite;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 48px;
    min-width: 48px;
    border-radius: 50%;
    border: 1px solid #facc15;

    .icon {
      font-size: 1.5rem;
    }

    .text {
      display: none;
    }

    &:hover, &:focus {
      color: #facc15;
      background: rgba(250, 204, 21, 0.3);
      box-shadow: 0 0 8px rgba(250, 204, 21, 0.4);
      animation: pulse 1s infinite;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    min-height: 44px;
    min-width: 44px;

    .icon {
      font-size: 1.3rem;
    }
  }
`;

const FollowButton = styled.a`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  background: transparent;
  border: 1px solid rgba(247, 231, 161, 0.3);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    color: #facc15;
    background: linear-gradient(45deg, rgba(250, 204, 21, 0.2), rgba(255, 77, 166, 0.2));
    box-shadow: 0 0 12px rgba(250, 204, 21, 0.6);
    animation: pulse 1.5s infinite;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 48px;
    min-width: 48px;
    border-radius: 50%;
    border: 1px solid #facc15;

    .icon {
      font-size: 1.5rem;
    }

    .text {
      display: none;
    }

    &:hover, &:focus {
      color: #facc15;
      background: rgba(250, 204, 21, 0.3);
      box-shadow: 0 0 8px rgba(250, 204, 21, 0.4);
      animation: pulse 1s infinite;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    min-height: 44px;
    min-width: 44px;

    .icon {
      font-size: 1.3rem;
    }
  }
`;

const Navbar = ({ bannerRef, chatRef, chatBannerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navLinksRef = useRef(null);

  useEffect(() => {
    let scrollTimeout;
    const handleScrollEvent = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 0);
      }, 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (navLinksRef.current) {
      const links = navLinksRef.current.children;
      gsap.fromTo(
        links,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          delay: isMobile ? 0.3 : 0,
        }
      );
    }
  }, [isMobile]);

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <GlobalStyles />
      <StyledNavbar isScrolled={isScrolled}>
        <Logo onClick={() => handleScroll(bannerRef)}>
          <img src={logo} alt="GTA Logo" />
        </Logo>
        <NavLinks id="nav-links" ref={navLinksRef}>
          <NavButton
            type="button"
            onClick={() => handleScroll(bannerRef)}
            aria-label="Go to Overview"
          >
            {isMobile && <HomeIcon className="icon" />}
            <span className="text">Overview</span>
          </NavButton>
          <NavButton
            type="button"
            onClick={() => handleScroll(chatBannerRef)}
            aria-label="Go to Capture"
          >
            {isMobile && <CameraAltIcon className="icon" />}
            <span className="text">Capture</span>
          </NavButton>
          <FollowButton
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
          >
            {isMobile && <RssFeedIcon className="icon" />}
            <span className="text">Follow Us</span>
          </FollowButton>
        </NavLinks>
      </StyledNavbar>
    </>
  );
};

export default Navbar;