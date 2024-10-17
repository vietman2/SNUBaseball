import styled from "styled-components";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  wide?: boolean;
  disabled?: boolean;
  password?: boolean;
}

export function TextInput({
  placeholder,
  value,
  onChange,
  wide = false,
  disabled = false,
  password = false,
}: Readonly<Props>) {
  if (wide) {
    return (
      <Container>
        <WideWrapper>
          <Input
            type={password ? "password" : "text"}
            placeholder=""
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            data-testid="text-input"
          />
        </WideWrapper>
      </Container>
    );
  } else {
    return (
      <InputWrapper>
        <Input
          type={password ? "password" : "text"}
          placeholder=""
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          data-testid="text-input"
        />
        <label className="placeholder">{placeholder}</label>
      </InputWrapper>
    );
  }
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
    font-size: 14px;
    top: 14px;
    left: 10px;
    transition: all 0.2s ease-in;
  }
`;

const Input = styled.input`
  border: ${({ theme }) => `2px solid ${theme.colors.borderDark}`};
  outline: none;
  border-radius: 6px;
  padding: 12px 8px;
  width: 100%;
  box-sizing: border-box;

  &:focus,
  &:not(:placeholder-shown) {
    border: ${({ theme }) => `2px solid ${theme.colors.primary};`}

  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    padding: 2px 6px;
    font-size: 14px;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background100};
    transform: translateY(calc(-1 * 2px - 22px));
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const WideWrapper = styled.div`
  display: flex;
  flex-direction: row;

  box-sizing: border-box;
`;
