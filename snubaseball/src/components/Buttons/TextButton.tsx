import styled from "styled-components";

interface Props {
  text: string;
  onClick: () => void;
}

export function TextButton({ text, onClick }: Readonly<Props>) {
  return <Button onClick={onClick}>{text}</Button>;
}

const Button = styled.div`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;

  &:hover {
    background-color: #45a049;
  }
`;
