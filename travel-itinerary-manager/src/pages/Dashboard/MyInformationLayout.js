import * as React from "react";
import styled from "styled-components";
import { NavigationMenu } from "../../components/NavigationMenu";
import { Sidebar } from "./Sidebar";
import { MyInformationContent } from "./MyInformationContent";

export function MyInformationLayout() {
  return (
    <LayoutContainer>
      <NavigationWrapper>
        <TopNavLinks>
          <NavLink>熱門景點</NavLink>
          <NavLink>出國旅遊</NavLink>
          <NavLink>台灣旅遊</NavLink>
        </TopNavLinks>
        <NavigationMenu />
      </NavigationWrapper>
      <ContentWrapper>
        <Sidebar />
        <MyInformationContent />
      </ContentWrapper>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 44px 80px 76px 31px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const NavigationWrapper = styled.div`
  align-self: end;
  z-index: 10;
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  padding: 3px 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TopNavLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const NavLink = styled.a`
  color: #fff;
  text-align: center;
  font: 700 20px Raleway, sans-serif;
  cursor: pointer;
`;

const ContentWrapper = styled.main`
  display: flex;
  margin-top: -94px;
  width: 831px;
  max-width: 100%;
  font-family: Plus Jakarta Sans, sans-serif;
`;