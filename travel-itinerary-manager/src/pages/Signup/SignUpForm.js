  import * as React from "react";
import styled from "styled-components";
import { AuthLayout } from "./AuthLayout";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { Button } from "./Button";
import { LoginLink } from "./LoginLink";
import {addUser} from "../../api";
import { useNavigate } from "react-router-dom";


const formFields = [
  { id: "username", label: "User name", type: "text" },
  { id: "email", label: "Email address", type: "email" }
];

export function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
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

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      await addUser(formData);
      // Redirect to signin page after successful registration
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data || "Error creating account");
    }
  };

  return (
    <AuthLayout>
      <FormContainer>
        <FormHeader>
          <Title>Create an account</Title>
          <LoginLink />
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
          
          <PasswordField 
            value={formData.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
`;