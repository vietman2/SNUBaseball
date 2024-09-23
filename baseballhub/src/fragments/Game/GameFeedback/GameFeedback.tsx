import styled from "styled-components";

import { Statsbar } from "@components/Progressbars";
import { Subtitle } from "@components/Texts";
import { GameResultsType } from "@models/records/game";

interface Props {
  game: GameResultsType;
}

export function GameFeedback({ game }: Readonly<Props>) {
  return (
    <Container>
      <Half>
        <Stats>
          <Subtitle>공격 주요기록</Subtitle>
          <Statsbar text="안타" number={5} />
          <Statsbar text="도루" number={10} />
          <Statsbar text="삼진" number={6} />
        </Stats>
        <Stats>
          <Subtitle>수비 주요기록</Subtitle>
          <Statsbar text="탈삼진" number={6} />
          <Statsbar text="볼넷" number={4} />
          <Statsbar text="사구" number={1} />
          <Statsbar text="실책" number={1} />
        </Stats>
      </Half>
      <Half>
        <Feedback>
          <Subtitle>경기 피드백</Subtitle>
          <div>{" \u2022 피이이이이이이이이이이이이이이이이이이이이이이이드백1"}</div>
          <div>{" \u2022 피드백2"}</div>
          <div>{" \u2022 피드백3"}</div>
        </Feedback>
      </Half>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px;
`;

const Half = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 4px;
  gap: 32px;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const Feedback = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 14px;
  padding: 0 16px;
  gap: 16px;
  color: ${({ theme }) => theme.colors.sapphire};
`;
