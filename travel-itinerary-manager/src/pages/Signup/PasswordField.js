import styled from "styled-components";
import { useState } from "react";

export function PasswordField({value,onChange}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordWrapper>
      <PasswordHeader>
        <Label htmlFor="password">Password</Label>
        <ToggleButton
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <ToggleIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7da8ed3f20b5b4122f7ad5ea10b2c7a004779f9e3cd9284bfd7bba240051604?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36"
            alt=""
          />
          <span>{showPassword ? "Hide" : "Show"}</span>
        </ToggleButton>
      </PasswordHeader>
      
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        aria-label="Password"
      />
      
      <HelpText>
        Use 8 or more characters with a mix of letters, numbers & symbols
      </HelpText>
    </PasswordWrapper>
  );
}

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const PasswordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 9px;
`;

const Label = styled.label`
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  color: rgba(102, 102, 102, 0.8);
  font-size: 18px;
  cursor: pointer;
`;

const ToggleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
  border-radius: 12px;
  min-height: 56px;
  margin-top: 4px;
  width: 100%;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 0 16px;
`;

const HelpText = styled.p`
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
  margin: 4px 0 0;
`;