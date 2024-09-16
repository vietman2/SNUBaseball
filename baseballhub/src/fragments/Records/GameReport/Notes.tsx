import styled from "styled-components";

import { Statsbar } from "@components/Progressbars";
import { palette } from "@colors/palette";

export function Notes() {
  return (
    <Container>
      <Stats>
        <Title>기록</Title>
        <Statsbar text="안타" number={5} />
        <Statsbar text="도루" number={10} />
        <Statsbar text="삼진" number={6} />
        <Statsbar text="실책" number={1} />
      </Stats>
      <Feedback>
        {"<Notes>"}
        <br />
        <br />
        {" \u2022 피드백1"}
        <br />
        <br />
        {" \u2022 피드백2"}
        <br />
        <br />
        {" \u2022 피드백2"}
      </Feedback>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.div`
  padding: 0 16px 8px 16px;
  font-size: 16px;
  font-weight: 600;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Feedback = styled.div`
  display: flex;
  flex: 1;
  margin: 16px 16px 0 0;
  padding: 8px 16px;
  font-size: 14px;
  color: ${palette.charcoal};
  border-radius: 8px;

  background-color: ${palette.fullWhite};
`;
