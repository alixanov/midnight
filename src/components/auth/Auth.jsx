import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Home } from '@mui/icons-material';
import authBg from '../../assets/backiee-301324-landscape.jpg';

const AuthContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(15, 10, 30, 0.75), rgba(50, 20, 70, 0.8)), url(${authBg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(26, 14, 42, 0.9);
  border: 1px solid #facc15;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  backdrop-filter: blur(4px);

  & svg {
    color: #facc15;
    font-size: 1.5rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.5);
    border-color: #f7e7a1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.4rem;

    & svg {
      font-size: 1.25rem;
    }
  }
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, rgba(26, 14, 42, 0.22), rgba(60, 26, 90, 0.24));
  border-radius: 12px;
  border: 2px solid rgba(247, 231, 161, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: #facc15;
  text-shadow: 0 0 6px rgba(247, 231, 161, 0.4);
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #d1d5db;
  background: rgba(26, 14, 42, 0.9);
  border: 1px solid #facc15;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #f7e7a1;
    box-shadow: 0 0 8px rgba(247, 231, 161, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: #1f1f1f;
  background: linear-gradient(45deg, #f7e7a1, #facc15);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(247, 231, 161, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ToggleLink = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #f7e7a1;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #facc15;
  }
`;

const ErrorMessage = styled.p`
  font-family: 'Russo One', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #ff5555;
  text-align: center;
  margin-bottom: 1rem;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const homeButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { background, animation, city } = location.state || {};

  useEffect(() => {
    // Animate form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animate home button
    gsap.fromTo(
      homeButtonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', user.username);
        navigate('/chat-room', { state: { background, animation, city } });
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Register
      if (!username || !email || !password) {
        setError('All fields are required');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u) => u.email === email)) {
        setError('Email already registered');
        return;
      }

      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      navigate('/chat-room', { state: { background, animation, city } });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <AuthContainer>
      <HomeButton ref={homeButtonRef} onClick={handleHomeClick} aria-label="Go to home">
        <Home />
      </HomeButton>
      <FormWrapper ref={formRef}>
        <Title>{isLogin ? 'Login' : 'Register'}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              aria-label="Username"
            />
          )}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
          />
          <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
        </form>
        <ToggleLink onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </ToggleLink>
      </FormWrapper>
    </AuthContainer>
  );
};

export default Auth;