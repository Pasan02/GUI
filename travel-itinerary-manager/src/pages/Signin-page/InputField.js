import styled from "styled-components";

export function InputField({ id, label, type, value, onChange }) {
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        aria-label={label}
        value={value}
        onChange={onChange}
        required
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
  padding: 2px 0;
`;

const Input = styled.input`
  border-radius: 12px;
  min-height: 56px;
  margin-top: 4px;
  width: 100%;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 0 16px;
`;