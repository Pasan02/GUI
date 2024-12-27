import * as React from "react";
import styled from "styled-components";

export function PasswordInput() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Wrapper>
      <InputHeader>
        <Label htmlFor="password">Your password</Label>
        <ToggleVisibility onClick={() => setShowPassword(!showPassword)}>
          <VisibilityIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7da8ed3f20b5b4122f7ad5ea10b2c7a004779f9e3cd9284bfd7bba240051604?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36"
            alt="Toggle password visibility"
          />
          <span>{showPassword ? 'Hide' : 'Show'}</span>
        </ToggleVisibility>
      </InputHeader>
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        aria-label="Password input"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 568px;
  flex-direction: column;
  justify-content: start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const InputHeader = styled.div`
  display: flex;
  width: 100%;
  padding-right: 9px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Label = styled.label`
  color: #666;
  font-size: 16px;
`;

const ToggleVisibility = styled.button`
  display: flex;
  gap: 8px;
  font-size: 18px;
  color: rgba(102, 102, 102, 0.8);
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const VisibilityIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const Input = styled.input`
  border-radius: 12px;
  min-height: 56px;
  margin-top: 4px;
  width: 100%;
  border: 1px solid rgba(102, 102, 102, 0.35);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;