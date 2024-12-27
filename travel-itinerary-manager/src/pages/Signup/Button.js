import styled from "styled-components";

export function Button({ children }) {
  return (
    <StyledButton type="submit">
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border-radius: 32px;
  background-color: rgba(17, 17, 17, 1);
  width: 100%;
  max-width: 220px;
  padding: 16px 10px;
  border: none;
  cursor: pointer;
  
  @media (max-width: 991px) {
    padding: 16px 10px;
  }
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  display: block;
`;