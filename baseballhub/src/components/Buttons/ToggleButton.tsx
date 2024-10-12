import styled from "styled-components";

interface Props {
  isOn: boolean;
  onClick: () => void;
}

export function ToggleButton({ isOn, onClick }: Readonly<Props>) {
  return (
    <Container onClick={onClick} data-testid="button">
      <Button $isOn={isOn} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background700};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background300};
  }
`;

const Button = styled.div<{ $isOn: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${({ $isOn }) => ($isOn ? "#4caf50" : "#f44336")};
  transition: all 0.3s;
  transform: ${({ $isOn }) => ($isOn ? "translateX(24px)" : "translateX(0)")};
`;
