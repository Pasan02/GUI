import * as React from "react";
import styled from "styled-components";

const navigationItems = [
  { label: "Home", isActive: true },
  { label: "Add Trip", isActive: false }
];

export function NavigationMenu() {
  return (
    <NavContainer>
      {navigationItems.map((item, index) => (
        <NavItem key={index} $isActive={item.isActive}>
          {item.label}
        </NavItem>
      ))}
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  align-items: start;
  gap: 8px;
  justify-content: end;
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  font: var(--sds-typography-body-font-weight-regular)
    var(--sds-typography-body-size-medium) / 1
    var(--sds-typography-body-font-family);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const NavItem = styled.button`
  align-self: stretch;
  border-radius: 8px;
  background-color: ${props => props.$isActive ? "#f5f5f5" : "transparent"};
  gap: 8px;
  color: ${props => props.$isActive ? "var(--sds-color-text-brand-on-brand-secondary)" : "var(--sds-color-text-default-default)"};
  white-space: nowrap;
  padding: 8px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;