import * as React from "react";
import styled from "styled-components";
import Header from "../../components/Header1";
import Footer from "../../components/Footer";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

export function DashboardLayout() {
  return (
    <LayoutContainer>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <MainContent />
      </ContentWrapper>
      <Footer/>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;



const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0.5rem;
`;
