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
  min-height: 100vh;
  padding: 0;
  position: relative;
`;


const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  width: 100%;
  padding: 44px 80px 76px 31px;
  overflow-y: auto;
`;