import React, { useRef } from "react";
import styled from 'styled-components';
import Navbar from "../navbar/Navbar";
import Banner from "../banner/Banner";
import ChatBanner from "../chat-banner/ChatBanner";
import Footer from "../footer/Footer";
import bgBanner from "../../assets/gta-bg.png";
import ChatBannerImg from "../../assets/gta-bg.png";

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(27, 10, 41, 0.88), rgba(27, 10, 41, 0.49) 30%, rgba(27, 10, 41, 0.37) 70%, rgba(27, 10, 41, 0.86)), url(${bgBanner});
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const ChatFooterContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(27, 10, 41, 0.97), rgba(27, 10, 41, 0.47) 30%, rgba(27, 10, 41, 0.49) 70%, rgb(27, 10, 41)), url(${ChatBannerImg});
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const Main = () => {
  const bannerRef = useRef(null);
  const chatBannerRef = useRef(null);
  const chatRef = useRef(null);

  return (
    <div>
      <MainContainer>
        <Navbar bannerRef={bannerRef} chatRef={chatRef} chatBannerRef={chatBannerRef} />
        <div ref={bannerRef}>
          <Banner chatRef={chatRef} chatBannerRef={chatBannerRef} />
        </div>
      </MainContainer>
      <ChatFooterContainer>
        <div ref={chatBannerRef}>
          <ChatBanner chatRef={chatRef} />
        </div>
        <Footer />
      </ChatFooterContainer>
    </div>
  );
};

export default Main;