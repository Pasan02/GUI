import * as React from "react";
import styled from "styled-components";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";
import { useNavigate } from "react-router-dom";


import { Map } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  

  const handleLogoClick = () => {
    navigate("/");
  }
  return (
    <HeaderContainer>
      <LogoBlock onClick={handleLogoClick}>
        <LogoWrapper>
          <LogoImage>
            <Map size={32} color="#2563EB" />
              <span>TravelPlanner</span>
              </LogoImage>
        </LogoWrapper>
      </LogoBlock>
      <NavigationMenu />
      <AuthButtons />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background-color: #fff;
  
  display: flex;
  width: 100%;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  justify-content: start;
  flex-wrap: wrap;
  padding: 22px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const LogoBlock = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: start;
  width: 40px;
  margin: auto 0;
`;

const LogoWrapper = styled.div`
  align-self: stretch;
  display: flex;
  width: 40px;
  align-items: center;
  justify-content: center;
  margin: auto 0;
`;

const LogoImage = styled.img`
  aspect-ratio: 2;
  object-fit: contain;
  object-position: center;
  width: 90px;
  align-self: stretch;
  margin: auto 0;
`;
