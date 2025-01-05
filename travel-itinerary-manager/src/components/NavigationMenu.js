import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth} from "../context/AuthContext";

const guestNavItems = [
  { label: "Home", path: "/" },
  { label: "Add Trip", path: "/plan-trip" }
];

const userNavItems = [
  { label: "Home", path: "/" }, 
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Trips", path: "/my-trips" },
  { label: "Add Trip", path: "/plan-trip" }
];


 
export function NavigationMenu() {
  const { isLoggedIn } = useAuth();
  const navigationItems = isLoggedIn ? userNavItems : guestNavItems;


  return (
    <NavContainer>
      {navigationItems.map((item, index) => (
        <StyledNavLink key={index} to={item.path}>
          {item.label}
        </StyledNavLink>
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
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  
  &.active {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  &:hover {
    background-color: #e0e0e0;
  }
`;