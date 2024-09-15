import styled from "styled-components";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ label, value, onChange }: Readonly<Props>) {
  return (
    <InputWrapper>
      <label>{label}</label>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="date-input"
      />
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
    background-color: white;
    color: gray;
    font-size: 14px;
    left: 10px;
    top: -10px;
    padding: 0 5px;
  }
`;

const Input = styled.input`
  border: 2px solid gray;
  outline: none;
  border-radius: 6px;
  padding: 8.5px 5px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid var(--focus-color);
`;
