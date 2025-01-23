import * as React from "react";
import styled from "styled-components";
import { AccountLink } from "./AccountLink";
import { PasswordInput } from "./PasswordInput";
import { AuthLayout } from "./AuthLayout";
import { InputField } from "./InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const formFields = [
  { id: "username", label: "User name or email address", type: "text" }
];

export function SignInForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = React.useState({
    username: "",
    password: ""
  });
  const [error, setError] = React.useState("");

  const handleInputChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePasswordChange = (value) => {
    setFormData(prev => ({
      ...prev,
      password: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('username', response.data.user.username);
    setIsLoggedIn(true);
    navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <FormContainer>
        <FormHeader>
          <Title>Sign in</Title>
          <TopAccountLink />
        </FormHeader>

        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <InputField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              value={formData[field.id]}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          ))}

<PasswordSection>
            <PasswordInput 
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <ForgotPassword>Forget your password</ForgotPassword>
          </PasswordSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}

<ActionSection>
  <Button type="submit">Sign in</Button>
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
const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
`;