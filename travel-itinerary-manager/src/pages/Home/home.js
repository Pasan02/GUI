import React from 'react';
import styled from 'styled-components';
import { Calendar, Share2, Download, Map, Coffee, Home, Car } from 'lucide-react';
import Header from '../../components/Header1';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../images/banner-image.jpg';
// Layout Components
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Main = styled.main`
  flex-grow: 1;
`;












// Section Components
const Section = styled.section`
  padding: 4rem 0;
  background: ${props => props.background || 'transparent'};
`;

const HeroSection = styled(Section)`
  background: linear-gradient(rgba(21, 83, 197, 0.9), rgba(215, 223, 231, 0.9)),
              url(${HeroBanner}) no-repeat center center;
  background-size: cover;
  color: white;
  min-height: 360px;
  display: flex;
  align-items: center;
`;

const HeroContent = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.light ? 'white' : '#1F2937'};
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const HeroText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

// Grid and Card Components
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '250px'}, 1fr));
  gap: ${props => props.gap || '2rem'};
  max-width: ${props => props.maxWidth || '1024px'};
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: ${props => props.centered ? 'center' : 'left'};
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  color: #2563EB;
  ${props => props.centered && `
    margin-left: auto;
    margin-right: auto;
  `}
`;

const CardTitle = styled.h3`
  font-size: ${props => props.size || '1.25rem'};
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #111827;
`;

const CardText = styled.p`
  color: #4B5563;
`;

// Preview Section Components
const PreviewContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1rem;
  max-width: 48rem;
  margin: 0 auto;
`;

const PreviewPlaceholder = styled.div`
  background: #E5E7EB;
  height: 24rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
`;

// Button Components
const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#2563EB' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2563EB'};
  padding: ${props => props.large ? '0.75rem 2rem' : '0.5rem 1rem'};
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#1D4ED8' : '#F9FAFB'};
  }
`;

// Footer Components





const HomePage = () => {
  const navigate = useNavigate();
  const handleStartPlanning = () => {
    navigate('/plan-trip');
  };
  const handleCreateAccount = () => {
      navigate('/signup');
    };
  
  
  return (
    <PageWrapper>
      <Header/>
        
  

      <Main>
        <HeroSection>
          <Container>
            <HeroContent>
              <HeroTitle>Plan Your Perfect Trip, Day by Day</HeroTitle>
              <HeroText>
                Create detailed travel itineraries, collaborate with friends, and keep all your plans in one place.
              </HeroText>
              <Button variant="primary" large onClick={handleStartPlanning}>
                Start Planning</Button>
            </HeroContent>
          </Container>
        </HeroSection>

        <Section>
          <Container>
            <Title>Everything You Need for Perfect Trip Planning</Title>
            <Grid>
              <Card>
                <IconWrapper><Calendar size={48} /></IconWrapper>
                <CardTitle>Day-wise Planning</CardTitle>
                <CardText>Organize your trip day by day with an intuitive interface. Never miss an activity or reservation.</CardText>
              </Card>
              <Card>
                <IconWrapper><Share2 size={48} /></IconWrapper>
                <CardTitle>Easy Sharing</CardTitle>
                <CardText>Share your itineraries with travel companions and collaborate in real-time.</CardText>
              </Card>
              <Card>
                <IconWrapper><Download size={48} /></IconWrapper>
                <CardTitle>Download & Go</CardTitle>
                <CardText>Download your itineraries for offline access. Perfect for when you're on the move.</CardText>
              </Card>
            </Grid>
          </Container>
        </Section>

        <Section background="#F3F4F6">
          <Container>
            <Title>Your Travel Command Center</Title>
            <PreviewContainer>
              <PreviewPlaceholder>
                <span>Itinerary View Screenshot Placeholder</span>
              </PreviewPlaceholder>
            </PreviewContainer>
          </Container>
        </Section>

        <Section>
          <Container>
            <Title>Track Every Detail of Your Journey</Title>
            <Grid minWidth="200px" maxWidth="64rem">
              <Card centered>
                <IconWrapper centered><Home size={48} /></IconWrapper>
                <CardTitle size="1.125rem">Lodging</CardTitle>
                <CardText>Hotels, hostels, and accommodation details</CardText>
              </Card>
              <Card centered>
                <IconWrapper centered><Coffee size={48} /></IconWrapper>
                <CardTitle size="1.125rem">Dining</CardTitle>
                <CardText>Restaurant reservations and meal planning</CardText>
              </Card>
              <Card centered>
                <IconWrapper centered><Map size={48} /></IconWrapper>
                <CardTitle size="1.125rem">Sightseeing</CardTitle>
                <CardText>Attractions, tours, and activities</CardText>
              </Card>
              <Card centered>
                <IconWrapper centered><Car size={48} /></IconWrapper>
                <CardTitle size="1.125rem">Transportation</CardTitle>
                <CardText>Flights, trains, and local transport</CardText>
              </Card>
            </Grid>
          </Container>
        </Section>

        <Section background="#2563EB">
          <Container>
            <HeroContent>
              <Title light>Ready to Start Planning Your Next Adventure?</Title>
              <Button large onClick={handleCreateAccount}>
                Create Free Account</Button>
            </HeroContent>
          </Container>
        </Section>
      </Main>

      <Footer/>
      
    </PageWrapper>
  );
};

export default HomePage;