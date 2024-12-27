import * as React from "react";
import styled from "styled-components";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButtons } from "./AuthButtons";

export function Header() {
  return (
    <HeaderContainer>
      <LogoBlock>
        <LogoWrapper>
          <LogoImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a10ce06b94eb5d8e95b452e68f87a132199206123acda962fec5de042a78ea59?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36"
            alt="Company Logo"
          />
        </LogoWrapper>
      </LogoBlock>
      <NavigationMenu />
      <AuthButtons />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  justify-content: start;
  flex-wrap: wrap;
  padding: 32px;
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
  aspect-ratio: 0.69;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
`;