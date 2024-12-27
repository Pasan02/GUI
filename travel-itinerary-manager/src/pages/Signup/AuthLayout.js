import styled from "styled-components";
import SignupImage from "./Images/signup-image.jpg";

export function AuthLayout({ children }) {
  return (
    <Container>
      <ContentWrapper>
        <ImageColumn>
          <AuthImage
            loading="lazy"
                      src={SignupImage}
            alt="Authentication illustration"
          />
        </ImageColumn>
        <FormColumn>
          <Content>
            {children}
          
          </Content>
        </FormColumn>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  padding-right: 24px;
  overflow: hidden;
  height:100vh;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  gap: 20px;
  display: flex;
  height: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 56%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AuthImage = styled.img`
  object-fit: cover;
  width: 95%;
  height: 100%;
  max-height: 100vh;
  
  @media (max-width: 991px) {
    max-width: 100%;
    max-height: 100px;
    
  

    
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 44%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  margin-top: 24px;
  align-items: flex-start;
  gap: 40px 57px;
  font-family: Poppins, sans-serif;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

