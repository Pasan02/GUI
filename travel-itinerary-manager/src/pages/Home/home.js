import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

export function Home() {
  return (
    <HomeContainer>
        <Header />
      <WelcomeSection>
        <Title>Travel Itinerary Manager</Title>
        <Subtitle>Plan your perfect trip</Subtitle>
      </WelcomeSection>
      <ContentSection>
        <Card>
          <h3>Your Upcoming Trips</h3>
          <p>No trips planned yet. Click "Add Trip" to get started!</p>
        </Card>
      </ContentSection>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  font-weight: normal;
`;

const ContentSection = styled.div`
  display: grid;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    margin-top: 0;
    color: #333;
  }
  
  p {
    color: #666;
  }
`;