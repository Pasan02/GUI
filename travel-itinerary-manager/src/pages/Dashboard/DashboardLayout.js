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
  postion: relative;
  padding: 0;
`;



const ContentWrapper = styled.div`
  flex: 1;
  display: flex;


  width: 97%;
  gap: 24px;
  padding: 44px 0px 76px 31px;
  overflow-y: auto;

`;
