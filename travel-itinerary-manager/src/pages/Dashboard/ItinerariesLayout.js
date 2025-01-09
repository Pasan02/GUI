import * as React from "react";
import styled from "styled-components";
import Header from "../../components/Header1";
import Footer from "../../components/Footer";
import { Sidebar } from "./Sidebar";
import { ItinerariesContent } from "./ItinerariesContent";

export function ItinerariesLayout() {
  return (
    <LayoutContainer>
      <Header/>
      
      <ContentWrapper>
        <Sidebar />
        <ItinerariesContent />
      </ContentWrapper>
      <Footer/>
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
  font-family: Poppins, sans-serif;
  cursor: pointer;
`;

const ContentWrapper = styled.main`
  display: flex;
  margin-top: -94px;
  width: 831px;
  max-width: 100%;
  font-family: Poppins, sans-serif;
`;