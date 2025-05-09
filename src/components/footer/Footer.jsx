import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
    background: linear-gradient(135deg, rgba(15, 10, 30, 0.66), rgba(35, 9, 52, 0.77));
  padding: 2rem 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'Russo One', sans-serif;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterText = styled.p`
  font-size: clamp(0.9rem, 1vw, 1rem);
  margin: 0 0 1rem;
  text-align: center;
  text-shadow: 0 0 6px rgba(247, 231, 161, 0.4);
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  color: #facc15;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4da6;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2025 GTA Online Community. All rights reserved.</FooterText>
      <FooterLinks>
        <FooterLink href="https://x.com/" target="_blank" rel="noopener noreferrer">
          Follow Us
        </FooterLink>
        <FooterLink>Privacy Policy</FooterLink>
        <FooterLink >Terms of Service</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;