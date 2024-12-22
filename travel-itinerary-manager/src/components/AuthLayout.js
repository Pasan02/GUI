import * as React from "react";
import styled from "styled-components";
import SignupImage from "../images/signup-image.jpg"

export function AuthLayout({ children }) {
  return (
    <Container>
      <ContentWrapper>
        <ImageColumn>
          <HeroImage loading="lazy" src={SignupImage} alt="" />
        </ImageColumn>
        <FormColumn>
          <FormWrapper>
            {children}
            <BrandLogo />
          </FormWrapper>
        </FormColumn>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  padding-right: 24px;
  overflow: hidden;

  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ImageColumn = styled.div`
  width: 56%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const HeroImage = styled.img`
  aspect-ratio: 0.7;
  object-fit: contain;
  width: 100%;
  
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const FormColumn = styled.div`
  width: 44%;
  margin-left: 20px;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  margin-top: 96px;
  gap: 40px 57px;
  font-family: Poppins, sans-serif;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const BrandLogo = styled.div`
  background-color: rgba(196, 196, 196, 1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: 40px;
`;