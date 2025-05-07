import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  background: #0f0f0f;
  color: #f1f1f1;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Russo One", sans-serif;
  border-top: 2px solid #facc15;
`;

const GameTitle = styled.h2`
  font-family: "Tilt Prism", cursive;
  font-size: 2rem;
  color: #facc15;
  margin-bottom: 10px;
`;

const Quote = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  color: #aaa;
  margin-bottom: 20px;
`;

const Socials = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialLink = styled.a`
  color: #facc15;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: #ffffff;
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
