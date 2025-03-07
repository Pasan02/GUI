import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #1F2937;
  color: #D1D5DB;
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  color: white;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const FooterText = styled.p`
  color: #D1D5DB;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FooterLink = styled.a`
  color: #D1D5DB;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: white;
  }
`;

const FooterDivider = styled.div`
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <FooterTitle>TravelPlanner</FooterTitle>
            <FooterText>Making travel planning simple, collaborative, and enjoyable. Our platform helps you create memorable trips by organizing your itineraries in one place.</FooterText>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Company</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterLinks>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Resources</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterGrid>
        <FooterDivider>
          <p>&copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.</p>
        </FooterDivider>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;