import styled from "styled-components";

interface Props {
  title?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export function TextInput({ title, value, onChange, placeholder }: Props) {
  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 8px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  margin: 10px 0px;
  width: 100%;
  box-sizing: border-box;
`;
