import * as React from "react";
import styled from "styled-components";


export function InputField({ label, type, id, showPasswordToggle }) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <InputContainer>
      <InputHeader>
        <Label htmlFor={id}>{label}</Label>
        {showPasswordToggle && (
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            <ToggleIcon
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7da8ed3f20b5b4122f7ad5ea10b2c7a004779f9e3cd9284bfd7bba240051604?placeholderIfAbsent=true&apiKey=25badedd98e242a3bd9df8a26a4bfa36"
              alt={showPassword ? "Hide password" : "Show password"}
            />
            <span>{showPassword ? "Hide" : "Show"}</span>
          </TogglePassword>
        )}
      </InputHeader>
      <StyledInput
        type={showPassword ? "text" : type}
        id={id}
        name={id}
        aria-label={label}
      />
      {type === "password" && (
        <HelperText>
          Use 8 or more characters with a mix of letters, numbers & symbols
        </HelperText>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 9px;
`;

const Label = styled.label`
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
`;

const TogglePassword = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: rgba(102, 102, 102, 0.8);
  font-size: 18px;
  cursor: pointer;
`;

const ToggleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledInput = styled.input`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  height: 56px;
  padding: 0 16px;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: rgba(17, 17, 17, 1);
  }
`;

const HelperText = styled.span`
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
`;