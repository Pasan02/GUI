import * as React from "react";
import styled from "styled-components";
import Header from "../../components/Header1";
import Footer from "../../components/Footer";
import { TripForm } from "./TripForm";

export function TripPlannerLayout() { 
  return (
    <MainContainer>
      <Header />
      <MenuHeading>
        <h1>Plan a New Trip</h1>
      </MenuHeading>
      <TripForm />
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 0px 0px;
  @media (max-width: 991px) {
    padding: 0 20px 100px;
  }
`;

const MenuHeading = styled.div`
  border-radius: 8px;
  align-self: center;
  display: flex;
  width: 284px;
  max-width: 100%;
  align-items: start;
  color: var(--sds-color-text-default-secondary);
  justify-content: start;
  margin: 31px 0 0 51px;
  padding: 8px 16px 4px;
  font: var(--sds-typography-body-font-weight-strong)
    var(--sds-typography-body-size-medium) / 1.4
    var(--sds-typography-body-font-family);
`;