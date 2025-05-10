import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { gsap } from 'gsap';
import { Home as HomeIcon, Assistant as AssistantIcon, X as XIcon } from '@mui/icons-material';
import logo from "../../assets/gta-logo.png";

// Global styles including font-face and keyframes
const GlobalStyles = createGlobalStyle`
  @font-face {
    src: url(../src/components/styles/Pricedown\\ Bl.otf);
    font-family: "Pricedown";
  }

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
  background: transparent;
  z-index: 10;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(247, 231, 161, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  pointer-events: auto;

  img {
    width: clamp(40px, 10vw, 45px);
    transition: all 0.3s ease;
  }

  &:hover {
    img {
      filter: drop-shadow(0 0 6px rgba(255, 69, 215, 0.6));
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    img {
      width: clamp(36px, 10vw, 40px);
    }

    &:hover {
      img {
        filter: drop-shadow(0 0 8px hsla(325, 100.00%, 59.60%, 0.80));
      }
    }
  }

  @media (max-width: 480px) {
    img {
      width: 36px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    gap: 0.8rem;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 12px;
  }
`;

const ButtonBase = styled.div`
  font-family: "Oswald-VariableFont";
  font-size: clamp(1.1rem, 1vw, 1rem);
  font-weight: 900;
  letter-spacing: 0.05em; /* Добавлено */
  padding: 0.5rem 1rem;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  pointer-events: auto;
  border-radius: 8px;

  .icon {
    color: #ffffff;
    transition: all 0.2s ease;
    display: none;
  }

  .text {
    transition: all 0.2s ease;
    letter-spacing: 0.05em; /* Добавлено */
  }

  &:hover {
    color: #ff4da6;
    
    .icon {
      color: #ff4da6;
    }
    
    .text {
      transform: translateY(-1px);
      text-shadow: rgba(255, 77, 166, 0.7);
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 48px;
    min-width: 48px;
    border-radius: 8px;
    background: rgba(27, 10, 41, 0.2);

    .icon {
      display: block;
      font-size: 1.4rem;
    }

    .text {
      display: none;
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(255, 50, 187, 0.2);
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    min-height: 44px;
    min-width: 44px;

    .icon {
      font-size: 1.2rem;
    }
  }
`;


const NavButton = styled(ButtonBase).attrs({ as: 'button' })`
  // Additional button-specific styles if needed
`;

const FollowButton = styled(ButtonBase).attrs({ as: 'a' })`
  text-decoration: none;

  .icon {
    display: block;
  }


  @media (min-width: 769px) {
    .icon {
      display: none;
    }
  }
`;

const Navbar = ({ bannerRef, chatBannerRef, chatRef }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navLinksRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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

  const handleScroll = (ref, label) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Ref for ${label} is undefined or invalid`);
    }
  };

  return (
    <>
      <GlobalStyles />
      <StyledNavbar>
        <Logo onClick={() => handleScroll(bannerRef, 'Logo')}>
          <img src={logo} alt="GTA Logo" />
        </Logo>
        <NavLinks id="nav-links" ref={navLinksRef}>
          <NavButton
            type="button"
            onClick={() => handleScroll(bannerRef, 'Overview')}
            aria-label="Go to Overview"
          >
            <HomeIcon className="icon" />
            <span className="text">Overview</span>
          </NavButton>
          <NavButton
            type="button"
            onClick={() => handleScroll(chatBannerRef, 'Capture')}
            aria-label="Go to Capture"
          >
            <AssistantIcon className="icon" />
            <span className="text">Capture</span>
          </NavButton>
          <FollowButton
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
          >
            <span className="text">Follow Us</span>
            <XIcon className="follow-icon" />
          </FollowButton>
        </NavLinks>
      </StyledNavbar>
    </>
  );
};

export default Navbar;