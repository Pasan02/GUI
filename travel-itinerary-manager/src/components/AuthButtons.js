import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function AuthButtons() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <AuthContainer>
      <SignInButton onClick={handleSignIn}>Sign in</SignInButton>
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: start;
  width: 178px;
  margin: auto 0;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
`;

const BaseButton = styled.button`
  align-self: stretch;
  border-radius: 8px;
  gap: 8px;
  overflow: hidden;
  flex: 1;
  margin: auto 0;
  padding: 8px;
  cursor: pointer;
`;

const SignInButton = styled(BaseButton)`
  background-color: #e3e3e3;
  color: var(--sds-color-text-default-default);
  border: 1px solid #767676;
`;

const RegisterButton = styled(BaseButton)`
  background-color: #2c2c2c;
  color: var(--sds-color-text-brand-on-brand);
  border: 1px solid #2c2c2c;
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;