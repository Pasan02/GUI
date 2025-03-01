import * as React from "react";
import styled from "styled-components";
import Header from "../../components/Header1";
import Footer from "../../components/Footer";
import { Sidebar } from "./Sidebar";
import { MyInformationContent } from "./MyInformationContent";

export function MyInformationLayout() {
  return (
    <LayoutContainer>
     <Header/>
      <ContentWrapper>
        <Sidebar />
        <MyInformationContent />
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
  padding: 44px 0px 76px 31px;
  overflow-y: auto;
`;


