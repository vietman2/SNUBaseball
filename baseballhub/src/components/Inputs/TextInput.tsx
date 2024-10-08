import styled from "styled-components";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ placeholder, value, onChange }: Readonly<Props>) {
  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="text-input"
      />
      <label className="placeholder">{placeholder}</label>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  label {
    position: absolute;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.borderDark};
    font-size: 12px;
    top: 11px;
    left: 10px;
    transition: all 0.2s ease-in;
  }
`;

const Input = styled.input`
  border: ${({ theme }) => `2px solid ${theme.colors.borderDark}`};
  outline: none;
  border-radius: 6px;
  padding: 10px 5px;
  width: 100%;
  box-sizing: border-box;

  &:focus,
  &:not(:placeholder-shown) {
    border: ${({ theme }) => `2px solid ${theme.colors.primary};`}

  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    padding: 0 5px;
    font-size: 14px;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background100};
    transform: translateY(calc(-1 * 2px - 20px));
  }
`;
