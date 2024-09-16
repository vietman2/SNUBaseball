import styled from "styled-components";

import { palette } from "@colors/palette";

interface Props {
  text: string;
  number: number;
}

export function Statsbar({ text, number }: Readonly<Props>) {
  const percentage = (number / 15) * 100;

  return (
    <Container>
      <Text>{text}</Text>
      <Bar>
        <Filler percentage={percentage} />
      </Bar>
      <Text>{number}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
`;

const Text = styled.div`
  display: flex;
  flex: 1;
  margin: 0 4px;
  font-size: 14px;
  color: ${palette.charcoal};
`;

const Bar = styled.div`
  display: flex;
  flex: 8;
  height: 16px;
  background-color: ${palette.grayBorder};
  border-radius: 8px;
  margin: 0 8px;
`;

const Filler = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  background-color: ${palette.primary};
  border-radius: 8px;
`;
