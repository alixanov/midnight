import React from "react";
import styled from "styled-components";
import chatBg from '../../assets/backiee-138850-landscape.jpg';

const FooterWrapper = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.9), rgba(60, 26, 90, 0.9)), url(${chatBg});
  background-size: cover;
  background-position: center;
  color: #d1d5db;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Russo One", sans-serif;
  border-top: 2px solid #facc15;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GameTitle = styled.h2`
  font-family: "Tilt Prism", sans-serif;
  font-size: clamp(1.6rem, 4vw, 2rem);
  color: #facc15;
  text-shadow: 0 0 8px rgba(247, 231, 161, 0.5);
  margin-bottom: 0.75rem;
`;

const Quote = styled.p`
  font-family: "Russo One", sans-serif;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-style: italic;
  color: #8b8b8b;
  margin-bottom: 1.25rem;
  text-align: center;
`;

const Socials = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SocialLink = styled.a`
  font-family: "Russo One", sans-serif;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  color: #facc15;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #f7e7a1;
    text-shadow: 0 0 8px rgba(247, 231, 161, 0.5);
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <GameTitle>DARK STREET</GameTitle>
      <Quote>“Survive. Rule. Repeat.”</Quote>
      <Socials>
        <SocialLink href="https://x.com/" target="_blank">Twitter</SocialLink>
        <SocialLink href="https://discord.com/" target="_blank">Discord</SocialLink>
        <SocialLink href="https://twitch.tv/" target="_blank">Twitch</SocialLink>
      </Socials>
    </FooterWrapper>
  );
};

export default Footer;