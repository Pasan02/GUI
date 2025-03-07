import * as React from "react";
import styled from "styled-components";
import SignInImage from "./images/1.jpg";

export function AuthHero() {
  return (
    <HeroColumn>
      <HeroWrapper>
        <HeroImage
          loading="lazy"
          src={SignInImage}
          alt="Hero background"
        />
        <HeroContent>
          <LogoWrapper />
          
        </HeroContent>
      </HeroWrapper>
    </HeroColumn>
  );
}

const HeroColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 56%
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1024px;
  flex-grow: 1;
  align-items: start;
  font-family: Poppins, sans-serif;
  color: #fff;
  width: 56%
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 100px 20px;
  }
`;

const HeroImage = styled.img`
  height: 100%;
  width: 95%;
  max-height:100vh;
  object-fit: cover;
  object-position: center;
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  width: 482px;
  max-width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  min-height: 48px;
  width: 48px;
`;
