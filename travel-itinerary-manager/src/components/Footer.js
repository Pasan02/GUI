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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: #D1D5DB;
`;

const FooterLink = styled.a`
  color: #D1D5DB;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  &:hover {
    color: white;
  }
`;

const FooterDivider = styled.div`
  border-top: 1px solid #374151;
  margin-top: 2rem;
  padding-top: 2rem;
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
            <FooterText>Making travel planning simple, collaborative, and enjoyable.</FooterText>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Product</FooterTitle>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Premium</FooterLink>
            <FooterLink href="#">Updates</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Company</FooterTitle>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Legal</FooterTitle>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
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