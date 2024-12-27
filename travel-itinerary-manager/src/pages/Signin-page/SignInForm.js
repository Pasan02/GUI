import * as React from "react";
import styled from "styled-components";
import { AccountLink } from "./AccountLink";
import { PasswordInput } from "./PasswordInput";
import { AuthLayout } from "./AuthLayout";
import { InputField } from "./InputField";

const formFields = [
  { id: "username", label: "User name or email address", type: "text" }
];

export function SignInForm() {
  return (
    <AuthLayout>
      <FormContainer>
        <FormHeader>
          <Title>Sign in</Title>
          <TopAccountLink />
        </FormHeader>

        <form>
                  {formFields.map((field) => (
                    <InputField
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      type={field.type}
                    />
                  ))}

          <PasswordSection>
            <PasswordInput />
            <ForgotPassword>Forget your password</ForgotPassword>
          </PasswordSection>

          <ActionSection>
            <Button>Sign in</Button>
            <AccountLink />
          </ActionSection>
        </form>
      </FormContainer>
    </AuthLayout>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin-top: 40px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  color: rgba(51, 51, 51, 1);
  font-size: 32px;
  font-weight: 500;
  margin: 0;
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 18px;
`;

const ForgotPassword = styled.a`
  color: #111;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
  width: 270px;
`;

const TopAccountLink = styled(AccountLink)`
  align-self: flex-end;
`;



const Button = styled.button`
  border-radius: 32px;
  background-color: #111;
  color: #fff;
  font-size: 20px;
  padding: 12px 24px;
  text-align: center;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #333;
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