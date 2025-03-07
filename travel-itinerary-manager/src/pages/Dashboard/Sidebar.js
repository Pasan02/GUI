import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api';
import defaultUser  from '../../images/default-user.jpg';
import { MdDashboard, MdInfo, MdSettings } from 'react-icons/md';
import { FaRoute } from 'react-icons/fa';

const menuItems = [
  { icon: <MdDashboard />, label: "Dashboard", path:"/dashboard", active: true },
  { icon: <MdInfo />, label: "My Information", path:"/my-information" },
  { icon: <MdSettings />, label: "Settings", path:"/settings" },
  { icon: <FaRoute />, label: "Itinerary", path:"/Itinerary" }
];

export function Sidebar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          const userInfo = await getUserInfo(storedUsername);
          setUsername(userInfo.name || userInfo.username); 
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <SidebarContainer>
      
      <UserProfile>
        <ProfileImage
          loading="lazy"
          src={defaultUser}
          alt="User profile"
        />
         <ProfileInfo>
          <UserName>{username || 'Loading...'}</UserName>
        </ProfileInfo>
      </UserProfile>
      <MenuList>
  {menuItems.map((item, index) => (
    <StyledNavLink key={index} to={item.path}>
      <MenuIcon>
        {item.icon}  
      </MenuIcon>
      <MenuLabel>{item.label}</MenuLabel>
    </StyledNavLink>
  ))}
</MenuList>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  z-index: 10;
  display: flex;
  width: 240px;
  max-width: 100%;
  flex-direction: column;
  padding: 0px 20px;
  
  margin-top:-80px;
  
`;

const UserProfile = styled.div`
  border-radius: 43px;
  display: flex;
  margin-top: 102px;
  margin-left: 20px;
  gap: 19px;
  padding: 13px 15px 13px 15px;
  border: 1px solid #e6e6e6;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 10px;
  }
`;

const ProfileImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 47px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

const UserName = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;



const MenuList = styled.nav`
  display: flex;
  margin-top: 44px;
  width: 100%;
  flex-direction: column;
  gap: 39px;
  padding: 0 25px;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;


const MenuIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const MenuLabel = styled.span`
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 10px;
  align-items: center;
  color:rgb(196, 196, 196);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #000;
  }

  &.active {
    background: #2563eb;
    color: white;
  }
`;