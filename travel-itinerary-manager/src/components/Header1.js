import React from 'react';
import styled from 'styled-components';
import { Map, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StyledLink = styled(Link)`
  color: #4B5563;
  text-decoration: none;
  &:hover {
    color: #2563EB;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderWrapper = styled.header`
  background: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;




const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#2563EB' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2563EB'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #2563EB'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#1D4ED8' : '#F9FAFB'};
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
        const navigate = useNavigate();
        const { isLoggedIn } = useAuth();
        
  const renderNavLinks = () => (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/plan-trip">Add Trip</StyledLink>
      {isLoggedIn ? (
        <StyledLink to="/dashboard">Dashboard</StyledLink>
      ) : (
        <ButtonGroup>
          <Button onClick={() => navigate('/signin')}>Sign In</Button>
          <Button variant="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
        </ButtonGroup>
      )}
    </Nav>
  );
  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo onClick={() => navigate('/')}>
            <Map size={32} color="#2563EB" />
            <span>TravelPlanner</span>
          </Logo>
          {renderNavLinks()}

          <MobileMenuButton>
            <Menu size={24} />
          </MobileMenuButton>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;