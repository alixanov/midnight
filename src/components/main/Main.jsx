import React, { useRef } from "react";
import Navbar from "../navbar/Navbar";
import Banner from "../banner/Banner";
import Chat from "../chat/Chat";
import Footer from "../footer/Footer";
import ChatBanner from "../chat-banner/ChatBanner";

const Main = () => {
  // Create refs for components
  const bannerRef = useRef(null);
  const chatBannerRef = useRef(null);
  const chatRef = useRef(null);

  return (
    <div>
      <Navbar bannerRef={bannerRef} chatRef={chatRef} chatBannerRef={chatBannerRef} />
      <div ref={bannerRef}>
        <Banner chatRef={chatRef} chatBannerRef={chatBannerRef} />
      </div>
      <div ref={chatBannerRef}>
        <ChatBanner chatRef={chatRef} />
      </div>
 
      <Footer />
    </div>
  );
};

export default Main;