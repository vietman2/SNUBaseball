import styled from "styled-components";

import { GamePitcherType } from "@models/records/game";

interface Props {
  pitchers: GamePitcherType[];
}

export function PitchersGameRecords({ pitchers }: Readonly<Props>) {
  return (
    <Container>
      <Table>
        <colgroup>
          <col style={{ width: "12%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>결과</th>
            <th>이닝</th>
            <th>타자</th>
            <th>투구수</th>
            <th>피안타</th>
            <th>피홈런</th>
            <th>볼넷</th>
            <th>사구</th>
            <th>탈삼진</th>
            <th>실점</th>
            <th>자책</th>
          </tr>
        </thead>
        <tbody>
          {pitchers.map((pitcher) => (
            <tr key={pitcher.name}>
              <td>{pitcher.name}</td>
              <td>{pitcher.result}</td>
              <td>{pitcher.innings_pitched}</td>
              <td>{pitcher.batter_faced}</td>
              <td>{pitcher.pitches}</td>
              <td>{pitcher.hits}</td>
              <td>{pitcher.homeruns}</td>
              <td>{pitcher.walks}</td>
              <td>{pitcher.hbps}</td>
              <td>{pitcher.strikeouts}</td>
              <td>{pitcher.runs_allowed}</td>
              <td>{pitcher.earned_runs}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 4px 0;
`;

const Table = styled.table`
  align-self: center;
  width: 100%;
  border-collapse: collapse;

  font-size: 14px;
  text-align: center;

  thead {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  th {
    padding: 4px 0;
    background-color: ${({ theme }) => theme.colors.primaryContainer};
    color: ${({ theme }) => theme.colors.linkText};
  }

  td {
    padding: 4px 0;
    text-align: center;
  }

  td:nth-child(1) {
    font-weight: bold;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
