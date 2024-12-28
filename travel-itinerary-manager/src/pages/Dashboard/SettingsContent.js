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
      <Button onClick={() => setIsModalOpen(true)}>Delete Account</Button>
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
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
`;

const ConfirmButton = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

