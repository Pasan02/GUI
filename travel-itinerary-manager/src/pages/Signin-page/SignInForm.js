import * as React from "react";
import styled from "styled-components";
import { AccountLink } from "./AccountLink";
import { PasswordInput } from "./PasswordInput";

export function SignInForm() {
  return (
    <FormContainer>
      <TopAccountLink />
      <FormWrapper>
        <FormTitle>Sign in</FormTitle>
        <Form>
          <InputGroup>
            <Label htmlFor="username">User name or email address</Label>
            <Input id="username" type="text" />
          </InputGroup>
          <PasswordSection>
            <PasswordInput />
            <ForgotPassword>Forget your password</ForgotPassword>
          </PasswordSection>
          <SubmitSection>
            <SubmitButton type="submit">
              <ButtonText>Sign in</ButtonText>
            </SubmitButton>
            <AccountLink />
          </SubmitSection>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  margin-top: 48px;
  flex-direction: column;
  font-family: Poppins, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const TopAccountLink = styled(AccountLink)`
  align-self: end;
`;

const FormWrapper = styled.div`
  display: flex;
  margin-top: 217px;
  width: 568px;
  max-width: 100%;
  flex-direction: column;
  justify-content: start;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const FormTitle = styled.h2`
  color: #333;
  font-size: 32px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  margin-top: 48px;
  width: 100%;
  flex-direction: column;
  font-weight: 400;
  justify-content: start;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: 16px;
  color: #666;
  justify-content: start;
`;

const Label = styled.label`
  width: 100%;
  padding: 2px 0;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Input = styled.input`
  border-radius: 12px;
  min-height: 56px;
  margin-top: 4px;
  width: 100%;
  border: 1px solid rgba(102, 102, 102, 0.35);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PasswordSection = styled.div`
  display: flex;
  margin-top: 18px;
  width: 100%;
  flex-direction: column;
  align-items: end;
  justify-content: start;
`;

const ForgotPassword = styled.a`
  color: #111;
  font-size: 16px;
  text-align: right;
  margin-top: 8px;
  cursor: pointer;
`;

const SubmitSection = styled.div`
  display: flex;
  margin-top: 18px;
  width: 304px;
  max-width: 100%;
  flex-direction: column;
  justify-content: start;
`;

const SubmitButton = styled.button`
  border-radius: 32px;
  background-color: #111;
  display: flex;
  width: 100%;
  max-width: 304px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  font-size: 20px;
  color: #fff;
  text-align: center;
  justify-content: center;
  padding: 17px 30px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const ButtonText = styled.span`
  align-self: stretch;
  gap: 8px;
`;