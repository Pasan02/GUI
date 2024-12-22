import * as React from "react";
import styled from "styled-components";
import { InputField } from "../components/InputField";
import { AuthLayout } from "../components/AuthLayout";

const inputFields = [
  { label: "User name", type: "text", id: "username" },
  { label: "Email address", type: "email", id: "email" },
  { label: "Password", type: "password", id: "password", showPasswordToggle: true }
];

function SignUpForm() {
  return (
    <AuthLayout>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        <FormHeader>
          <Title>Create an account</Title>
          <LoginPrompt>
            Already have an account? <LoginLink>Log in</LoginLink>
          </LoginPrompt>
        </FormHeader>

        <InputFieldsContainer>
          {inputFields.map((field) => (
            <InputField key={field.id} {...field} />
          ))}
        </InputFieldsContainer>

        <TermsText>
          By creating an account, you agree to our
          <br />
          <TermsLink>Terms of use</TermsLink> and <TermsLink>Privacy Policy</TermsLink>
        </TermsText>

        <ActionContainer>
          <SubmitButton type="submit">Create an account</SubmitButton>
          <LoginPrompt>
            Already have an account? <LoginLink>Log in</LoginLink>
          </LoginPrompt>
        </ActionContainer>
      </FormContainer>
    </AuthLayout>
  );
}

export default SignUpForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 473px;
  gap: 32px;
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  color: rgba(51, 51, 51, 1);
  font-size: 32px;
  font-weight: 500;
  margin: 0;
`;

const LoginPrompt = styled.p`
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  margin: 0;
`;

const LoginLink = styled.span`
  color: rgba(17, 17, 17, 1);
  cursor: pointer;
`;

const InputFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TermsText = styled.p`
  font-size: 16px;
  color: rgba(102, 102, 102, 1);
  margin: 0;
`;

const TermsLink = styled.span`
  text-decoration: underline;
  color: rgba(17, 17, 17, 1);
  cursor: pointer;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
`;

const SubmitButton = styled.button`
  border-radius: 32px;
  background-color: rgba(17, 17, 17, 1);
  color: white;
  font-size: 22px;
  font-weight: 500;
  padding: 16px 27px;
  border: none;
  cursor: pointer;
  width: 270px;

  @media (max-width: 991px) {
    padding: 16px 20px;
  }
`;