import * as React from "react";
import styled from "styled-components";

export function AccountLink() {
  return (
    <LinkText>
      <span>Don't have an acount? </span>
      <Link>Sign up</Link>
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

const Link = styled.a`
  color: #111;
  cursor: pointer;
`;