import styled from "styled-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  password?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  password,
}: Readonly<Props>) {
  return (
    <InputWrapper>
      <Input
        type={password ? "password" : "text"}
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`textinput-${placeholder}`}
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
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 0.9rem;
    top: 14px;
    left: 10px;
    transition: all 0.2s ease-in;
  }
`;

const Input = styled.input`
  border: ${({ theme }) => `2px solid ${theme.colors.gray300}`};
  outline: none;
  border-radius: 6px;
  padding: 12px 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;

  &:focus,
  &:not(:placeholder-shown) {
    border: ${({ theme }) => `2px solid ${theme.colors.primary};`}

  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    padding: 2px 6px;
    font-size: 1rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background100};
    transform: translateY(calc(-1 * 2px - 22px));
  }
`;
