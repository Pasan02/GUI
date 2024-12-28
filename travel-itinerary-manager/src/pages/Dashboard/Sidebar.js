import * as React from "react";
import styled from "styled-components";

const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3fab88e26d43a5895b3cdb44dd35cb16999a5d62e7baabe02f60944f2131b54?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36", label: "Dashboard", active: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/184f9ba7ada8b0c56dd557c35cd84ecc431129fc6a64b13080e016ae7cce4004?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36", label: "My Information" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9de4d59ff93afe11d438d6462faaf2c0114076dfa3ec79dd101cc4c8158c1804?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36", label: "Settings" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9de4d59ff93afe11d438d6462faaf2c0114076dfa3ec79dd101cc4c8158c1804?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36", label: "Itinerary" }
];

export function Sidebar() {
  return (
    <SidebarContainer>
      <BrandTitle>BonVoyage</BrandTitle>
      <UserProfile>
        <ProfileImage
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b37c0921fec6831e9e005d39fdd9f45faec9bfed77ca606675e2802af15496f?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36"
          alt="User profile"
        />
        <ProfileInfo>
          <UserName>Weiwei WANG</UserName>
          <MembershipStatus>Standard Member</MembershipStatus>
        </ProfileInfo>
      </UserProfile>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuIcon
              loading="lazy"
              src={item.icon}
              alt={`${item.label} icon`}
            />
            <MenuLabel>{item.label}</MenuLabel>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  z-index: 10;
  display: flex;
  width: 245px;
  max-width: 100%;
  flex-direction: column;
`;

const BrandTitle = styled.h1`
  color: #fff;
  margin-left: 11px;
  font: 900 36px Roboto, sans-serif;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const UserProfile = styled.div`
  border-radius: 43px;
  display: flex;
  margin-top: 102px;
  gap: 19px;
  padding: 23px 25px;
  border: 1px solid #e6e6e6;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
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

const MembershipStatus = styled.span`
  color: #7c7c7c;
  font-size: 10px;
  font-weight: 500;
  margin-top: 12px;
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

const MenuItem = styled.a`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #c4c4c4;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const MenuIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 26px;
`;

const MenuLabel = styled.span`
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;