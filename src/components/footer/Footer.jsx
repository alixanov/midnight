import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles for font-face
const GlobalStyles = createGlobalStyle`
  @font-face {
    src: url(../src/components/styles/Pricedown\\ Bl.otf);
    font-family: "Pricedown";
  }
`;

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.66), rgba(35, 9, 52, 0.77));
  padding: 2rem 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
    font-family: "Oswald-VariableFont";
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterText = styled.p`
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 400;
  margin: 0 0 1rem;
  text-align: center;
  text-shadow: 0 0 6px rgba(247, 231, 161, 0.4);
  letter-spacing: 0.03em;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  font-size: clamp(0.85rem, 0.9vw, 0.95rem);
  font-weight: 700;
    color: #ff4da6;
  text-decoration: none;
  transition: color 0.3s ease;
  letter-spacing: 0.03em;

  &:hover {
    color:rgb(131, 0, 91);
  }
`;

const Footer = () => {
  return (
    <>
      <GlobalStyles />
      <FooterContainer>
        <FooterText>© 2025 GTA Online Community. All rights reserved.</FooterText>
        <FooterLinks>
          <FooterLink href="https://x.com/" target="_blank" rel="noopener noreferrer">
            Follow Us
          </FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterLinks>
      </FooterContainer>
    </>
  );
};

export default Footer;