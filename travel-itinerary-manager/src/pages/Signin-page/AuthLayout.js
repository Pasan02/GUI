import * as React from "react";
import styled from "styled-components";
import { SignInForm } from "./SignInForm";
import { AuthHero } from "./AuthHero";

export function AuthLayout() {
  return (
    <Container>
      <ContentWrapper>
        <AuthHero />
        <FormColumn>
          <SignInForm />
        </FormColumn>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  padding-right: 48px;
  overflow: hidden;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 45%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;