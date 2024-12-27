  import * as React from "react";
import styled from "styled-components";
import { AuthLayout } from "./AuthLayout";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { Button } from "./Button";
import { LoginLink } from "./LoginLink";


const formFields = [
  { id: "username", label: "User name", type: "text" },
  { id: "email", label: "Email address", type: "email" }
];

export function SignUpForm() {
  return (
    <AuthLayout>
      <FormContainer>
        <FormHeader>
          <Title>Create an account</Title>
          <LoginLink />
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
          
          <PasswordField />
          
          
          <ActionSection>
            <Button>Create an account</Button>
            <LoginLink />
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

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
  width: 270px;
`;