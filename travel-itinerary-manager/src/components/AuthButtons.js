import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../context/AuthContext";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export function AuthButtons() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  if (isLoggedIn) {
    return (
      <AuthContainer>
      <SignInButton onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </SignInButton>
    </AuthContainer>
    );
  }

  return (
    <AuthContainer>
       <SignInButton onClick={handleSignIn}>
      <FaSignInAlt /> Sign in
    </SignInButton>
    <RegisterButton onClick={handleRegister}>
      <FaUserPlus /> Register
    </RegisterButton>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const SignInButton = styled(BaseButton)``;
const RegisterButton = styled(BaseButton)``;
