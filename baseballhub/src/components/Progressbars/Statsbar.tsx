import styled from "styled-components";

interface Props {
  text: string;
  number: number;
}

export function Statsbar({ text, number }: Readonly<Props>) {
  const percentage = (number / 15) * 100;

  return (
    <Container>
      <Text width={48}>{text}</Text>
      <Bar>
        <Filler percentage={percentage} />
      </Bar>
      <Text width={16}>{number}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.div<{ width: number }>`
  display: flex;
  justify-content: center;
  width: ${({ width }) => width}px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Bar = styled.div`
  display: flex;
  flex: 1;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.background700};
  border-radius: 8px;
  margin: 0 2px;
`;

const Filler = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;
