import React, { useRef, useEffect } from "react";
import styled from 'styled-components';
import Navbar from "../navbar/Navbar";
import Banner from "../banner/Banner";
import ChatBanner from "../chat-banner/ChatBanner";
import Footer from "../footer/Footer";
import bgBanner from "../../assets/gta-bg.png";
import ChatBannerImg from "../../assets/backiee-274909-landscape.jpg";
import Txt from "../txt/Txt";

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.2), rgba(50, 20, 70, 0.13)), url(${bgBanner});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const ChatFooterContainer = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.4), rgba(50, 20, 70, 0.47)), url(${ChatBannerImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
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

const Main = () => {
  const bannerRef = useRef(null);
  const chatBannerRef = useRef(null);
  const chatRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const chatFooterCanvasRef = useRef(null);

  useEffect(() => {
    // Preload background images
    const imgMain = new Image();
    imgMain.src = bgBanner;
    const imgChat = new Image();
    imgChat.src = ChatBannerImg;

    // Particle effect for MainContainer (Navbar + Banner + Txt)
    const mainCanvas = mainCanvasRef.current;
    const mainCtx = mainCanvas.getContext('2d');
    const resizeMainCanvas = () => {
      mainCanvas.width = window.innerWidth;
      mainCanvas.height = mainCanvas.parentElement.offsetHeight;
    };
    resizeMainCanvas();

    const mainParticles = [];
    const mainParticleCount = window.innerWidth < 640 ? 50 : 100;

    class MainParticle {
      constructor() {
        this.x = Math.random() * mainCanvas.width;
        this.y = Math.random() * mainCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(mouse, time) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size = this.baseSize + Math.sin(time * 0.002 + this.phase) * 0.5;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            this.x -= dx / 60;
            this.y -= dy / 60;
            this.opacity = Math.min(this.opacity + 0.1, 0.8);
          } else {
            this.opacity = Math.max(this.opacity - 0.05, 0.3);
          }
        }

        if (this.x < 0 || this.x > mainCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > mainCanvas.height) this.speedY *= -1;
      }

      draw() {
        mainCtx.fillStyle = `rgb(255, 0, 217, ${this.opacity})`;
        mainCtx.beginPath();
        mainCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        mainCtx.fill();
      }
    }

    for (let i = 0; i < mainParticleCount; i++) {
      mainParticles.push(new MainParticle());
    }

    // Particle effect for ChatFooterContainer (ChatBanner + Footer)
    const chatFooterCanvas = chatFooterCanvasRef.current;
    const chatFooterCtx = chatFooterCanvas.getContext('2d');
    const resizeChatFooterCanvas = () => {
      chatFooterCanvas.width = window.innerWidth;
      chatFooterCanvas.height = chatFooterCanvas.parentElement.offsetHeight;
    };
    resizeChatFooterCanvas();

    const chatFooterParticles = [];
    const chatFooterParticleCount = window.innerWidth < 640 ? 40 : 80;

    class ChatFooterParticle {
      constructor() {
        this.x = Math.random() * chatFooterCanvas.width;
        this.y = Math.random() * chatFooterCanvas.height;
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

        if (this.x < 0 || this.x > chatFooterCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > chatFooterCanvas.height) this.speedY *= -1;
      }

      draw() {
        chatFooterCtx.fillStyle = `rgb(255, 0, 217, ${this.opacity})`;
        chatFooterCtx.beginPath();
        chatFooterCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        chatFooterCtx.fill();
      }
    }

    for (let i = 0; i < chatFooterParticleCount; i++) {
      chatFooterParticles.push(new ChatFooterParticle());
    }

    const mouse = { x: null, y: null };
    let time = 0;

    const handleMouseMove = (e) => {
      const mainRect = mainCanvas.getBoundingClientRect();
      const chatRect = chatFooterCanvas.getBoundingClientRect();
      if (e.clientX >= mainRect.left && e.clientX <= mainRect.right &&
        e.clientY >= mainRect.top && e.clientY <= mainRect.bottom) {
        mouse.x = e.clientX - mainRect.left;
        mouse.y = e.clientY - mainRect.top;
      } else if (e.clientX >= chatRect.left && e.clientX <= chatRect.right &&
        e.clientY >= chatRect.top && e.clientY <= chatRect.bottom) {
        mouse.x = e.clientX - chatRect.left;
        mouse.y = e.clientY - chatRect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animateParticles() {
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      chatFooterCtx.clearRect(0, 0, chatFooterCanvas.width, chatFooterCanvas.height);
      time += 1;

      mainParticles.forEach((particle) => {
        particle.update(mouse, time);
        particle.draw();
      });

      chatFooterParticles.forEach((particle) => {
        particle.update(mouse, time);
        particle.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ResizeObserver for dynamic canvas height
    const mainResizeObserver = new ResizeObserver(resizeMainCanvas);
    mainResizeObserver.observe(mainCanvas.parentElement);

    const chatFooterResizeObserver = new ResizeObserver(resizeChatFooterCanvas);
    chatFooterResizeObserver.observe(chatFooterCanvas.parentElement);

    // Debounced window resize for canvas width
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        mainCanvas.width = window.innerWidth;
        chatFooterCanvas.width = window.innerWidth;
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mainResizeObserver.disconnect();
      chatFooterResizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <MainContainer>
        <ParticleCanvas ref={mainCanvasRef} />
        <Navbar bannerRef={bannerRef} chatRef={chatRef} chatBannerRef={chatBannerRef} />
        <div ref={bannerRef}>
          <Banner chatRef={chatRef} chatBannerRef={chatBannerRef} />
        </div>
        <Txt chatBannerRef={chatBannerRef} />
      </MainContainer>
      <ChatFooterContainer>
        <ParticleCanvas ref={chatFooterCanvasRef} />
        <div ref={chatBannerRef}>
          <ChatBanner chatRef={chatRef} />
        </div>
        <Footer />
      </ChatFooterContainer>
    </div>
  );
};

export default Main;