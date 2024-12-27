import * as React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export function AccountLink() {
  return (
    <LinkText>
      <span>Don't have an acount? </span>
      <Link to="/signup">Sign up</Link>
    </LinkText>
  );
}

const LinkText = styled.div`
  gap: 10px;
  padding: 2px;
  font-size: 16px;
  color: #666;
  margin-top: 8px;
`;

const Link = styled(RouterLink)`
  color: #111;
  cursor: pointer;
`;