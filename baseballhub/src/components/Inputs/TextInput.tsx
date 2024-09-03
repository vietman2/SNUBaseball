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
  --padding: 2px;
  --focus-color: #0f0f70;
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  label {
    position: absolute;
    background-color: transparent;
    color: gray;
    font-size: 12px;
    top: 11px;
    left: 10px;
    transition: all 0.2s ease-in;
  }
`;

const Input = styled.input`
  border: 2px solid gray;
  outline: none;
  border-radius: 6px;
  padding: 10px 5px;
  width: 100%;
  box-sizing: border-box;

  &:focus,
  &:not(:placeholder-shown) {
    border: 2px solid var(--focus-color);
  }

  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    transform: translateY(calc(-1 * var(--padding) - 20px));
    font-size: 14px;
    color: var(--focus-color);
    background-color: white;
    padding: 0 5px;
  }
`;
