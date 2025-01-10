import React, { useState } from "react";
import styled from "styled-components";

export function SettingsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    // Make an API call to delete the account
    console.log("Account deleted");
    // Redirect the user to the login or goodbye page
  };

  return (
    <Container>
      <Divider />
      <ContentWrapper>
        <PageTitle>Account Settings</PageTitle>
        <Section>
          <SectionTitle>Delete Account</SectionTitle>
          <WarningText>
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </WarningText>
          <Button onClick={() => setIsModalOpen(true)}>Delete Account</Button>
        </Section>
      </ContentWrapper>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <ModalActions>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              <ConfirmButton onClick={handleDeleteAccount}>Confirm</ConfirmButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}



const Container = styled.div`
  display: flex;
  gap: 40px;
`;

const Divider = styled.div`
  width: 3px;
  height: 100%;
  background: rgba(196, 196, 196, 0.5);
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 40px;
`;

const Section = styled.div`
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #dc3545;
  margin-bottom: 16px;
`;

const WarningText = styled.p`
  color: #666;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const ModalActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

const ConfirmButton = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;