import styled from "styled-components";

interface Props {
  text: string;
  onClick: () => void;
}

export const TextButton = ({ text, onClick }: Props) => {
  return (
    <Button onClick={onClick} data-testid="button">
      {text}
    </Button>
  );
};

const Button = styled.div`
  background-color: #0f0f70;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
