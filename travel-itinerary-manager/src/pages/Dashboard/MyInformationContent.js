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
    <ContentContainer>
      <Divider />
      <ContentWrapper>
        <PageTitle>My Information</PageTitle>
        <InfoGrid>
          <InfoCard>
            <Form>
              <FormField>
                <Label>Name:</Label>
                <Input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormField>
              <FormField>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormField>
              <FormField>
                <Label>Country:</Label>
                <Input
                  type="text"
                  name="country"
                  value={userInfo.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  disabled={!isEditing}
                />
              </FormField>
              <FormField>
                <Label>Phone Number:</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                />
              </FormField>
              <ButtonContainer>
                {isEditing ? (
                  <ActionButton onClick={handleSave}>Save Changes</ActionButton>
                ) : (
                  <ActionButton onClick={() => setIsEditing(true)}>Edit</ActionButton>
                )}
              </ButtonContainer>
            </Form>
          </InfoCard>
        </InfoGrid>
      </ContentWrapper>
    </ContentContainer>
  );
}


const ContentContainer = styled.section`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  font-size: 50px;
  color: #000;
  font-weight: 700;
  @media (max-width: 991px) {
    font-size: 40px;
    flex-direction: row;
  }
`;

const Divider = styled.div`
  width: 3px;
  height: 100%;
  background: rgba(196, 196, 196, 0.5);
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-right: -600px;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${props => props.disabled ? '#f5f5f5' : 'white'};
  color: ${props => props.disabled ? '#666' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;