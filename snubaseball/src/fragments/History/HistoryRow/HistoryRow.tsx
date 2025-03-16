import styled from "styled-components";

import { HistoryType } from "@models/about";

export function HistoryHeaderRow() {
  return (
    <Row>
      <span>연도</span>
      <span>교수</span>
      <span>감독</span>
      <span>주장</span>
      <span>수석매니저</span>
      <span>경기수</span>
      <span>승</span>
      <span>무</span>
      <span>패</span>
    </Row>
  );
}

interface Props {
  history: HistoryType;
}

export function HistoryRow({ history }: Readonly<Props>) {
  return (
    <Row>
      <span>{history.year}</span>
      <span>{history.professor.split(" ")[0]}</span>
      <span>{history.head_coach.split(" ")[0]}</span>
      <span>{history.captain}</span>
      <span>{history.head_manager}</span>
      <span>{history.games}</span>
      <span>{0}</span>
      <span>{0}</span>
      <span>{0}</span>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 0;

  > span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    height: 32px;
    font-size: 1rem;

    @media (max-width: 768px) {
      min-width: 64px;
      font-size: 0.875rem;
    }
  }
`;
