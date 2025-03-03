import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { getUserInfo, updateUserInfo } from "../../api";


const FORM_FIELDS = [
  { name: 'username', label: 'Username:', type: 'text' },
  { name: 'name', label: 'Name:', type: 'text', placeholder: 'Enter your Name' },
  { name: 'email', label: 'Email:', type: 'email' },
  { name: 'country', label: 'Country:', type: 'text', placeholder: 'Enter your country' },
  { name: 'phone', label: 'Phone Number:', type: 'tel', placeholder: 'Enter your phone number' }
];

// Separate form component for better organization
const UserInfoForm = ({ userInfo, isEditing, handleChange, handleSave, setIsEditing }) => (
  <Form>
    {FORM_FIELDS.map(field => (
      <FormField key={field.name}>
        <Label>{field.label}</Label>
        <Input
          type={field.type}
          name={field.name}
          value={userInfo[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={!isEditing}
        />
      </FormField>
    ))}
    <ButtonContainer>
      <ActionButton onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        {isEditing ? 'Save Changes' : 'Edit'}
      </ActionButton>
    </ButtonContainer>
  </Form>
);


const LoadingState = () => <LoadingWrapper>Loading...</LoadingWrapper>;
const ErrorState = ({ message }) => <ErrorWrapper>{message}</ErrorWrapper>;

export function MyInformationContent() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    email: "",
    country: "",
    phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const username = localStorage.getItem('username');
        const data = await getUserInfo(username);
        setUserInfo(data);
      } catch (err) {
        setError('Failed to load user information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const username = localStorage.getItem('username');
      await updateUserInfo(username, userInfo);
      setIsEditing(false);
      alert('Your information has been updated successfully.');
    } catch (err) {
      alert('Failed to update information. Please try again.');
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;


  return (
    <ContentContainer>
      <Divider />
      <ContentWrapper>
        <PageTitle>My Information</PageTitle>
        <InfoGrid>
          <InfoCard>
            <UserInfoForm
              userInfo={userInfo}
              isEditing={isEditing}
              handleChange={handleChange}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
            />
          </InfoCard>
        </InfoGrid>
      </ContentWrapper>
    </ContentContainer>
  );
}

// Styled components remain the same but with additional components
const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  font-size: 1.2rem;
`;

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
  background:rgb(249, 249, 249);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgb(255, 255, 255);
  max-width: 600px; // Add max-width to control form width
  width: 100%;
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
  max-width: 400px; // Add max-width to control input field width
  width: 100%;
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
  width: 100%; // Make sure input takes full width of FormField
  
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