import React, { useState } from "react";
import styled from "styled-components";

export function MyInformationContent() {
  // Sample initial data (to be replaced with actual data from API or user context)
  const [userInfo, setUserInfo] = useState({
    name: "Weiwei Wang",
    email: "weiwei@example.com",
    country: "",
    phone: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Add API call to save data
    console.log("Saved user info:", userInfo);
    setIsEditing(false);
    alert("Your information has been updated.");
  };

  return (
    <Container>
      <PageTitle>My Information</PageTitle>
      <Form>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Label>
        <Label>
          Email:
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Label>
        <Label>
          Country:
          <Input
            type="text"
            name="country"
            value={userInfo.country}
            onChange={handleChange}
            placeholder="Enter your country"
            disabled={!isEditing}
          />
        </Label>
        <Label>
          Phone Number:
          <Input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            disabled={!isEditing}
          />
        </Label>
        <ButtonContainer>
          {isEditing ? (
            <SaveButton onClick={handleSave}>Save Changes</SaveButton>
          ) : (
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
          )}
        </ButtonContainer>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  &:disabled {
    background-color: #f9f9f9;
    color: #888;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveButton = styled(EditButton)`
  background-color: #28a745;
`;

