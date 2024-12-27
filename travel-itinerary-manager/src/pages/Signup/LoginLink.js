import styled from "styled-components";

export function LoginLink() {
  return (
    <LinkText>
      <span>Already have an account?</span>{" "}
      <Link href="/login">Log in</Link>
    </LinkText>
  );
}

const LinkText = styled.p`
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  margin: 0;
  padding: 2px;
`;

const Link = styled.a`
  color: rgba(17, 17, 17, 1);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;