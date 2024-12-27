import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export function LoginLink() {
  return (
    <LinkText>
      <span>Already have an account?</span>{" "}
      <Link to="/signin">Log in</Link>
    </LinkText>
  );
}

const LinkText = styled.p`
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  margin: 0;
  padding: 2px;
`;

const Link = styled(RouterLink)`
  color: rgba(17, 17, 17, 1);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;