import styled from "styled-components";

import { Subtitle } from "@components/Texts";
import { LineupType, GamePitcherType } from "@models/records";

interface Props {
  lineup: LineupType;
  pitchers: GamePitcherType[];
}

export function GameRecords({ lineup, pitchers }: Readonly<Props>) {
  return (
    <Container>
      <Subtitle>타자기록</Subtitle>
      <Table maincolumn={2}>
        <colgroup>
          <col style={{ width: "9%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>타순</th>
            <th>이름</th>
            <th>타석</th>
            <th>타수</th>
            <th>안타</th>
            <th>타점</th>
            <th>득점</th>
            <th>사사구</th>
            <th>삼진</th>
            <th>도루</th>
          </tr>
        </thead>
        <tbody>
          {lineup.map((order) =>
            order.batters.map((batter, index) => (
              <tr key={batter.number}>
                <td>{index === 0 ? order.order : "교체"}</td>
                <td>{batter.name}</td>
                <td>{batter.plate_appearances}</td>
                <td>{batter.at_bats}</td>
                <td>{batter.hits}</td>
                <td>{batter.rbis}</td>
                <td>{batter.runs_scored}</td>
                <td>{batter.walks_hbps}</td>
                <td>{batter.strikeouts}</td>
                <td>{batter.steals}</td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan={2}>합</td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce(
                    (acc, batter) => acc + batter.plate_appearances,
                    0
                  )
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce((acc, batter) => acc + batter.at_bats, 0)
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce((acc, batter) => acc + batter.hits, 0)
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce((acc, batter) => acc + batter.rbis, 0)
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce(
                    (acc, batter) => acc + batter.runs_scored,
                    0
                  )
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce(
                    (acc, batter) => acc + batter.walks_hbps,
                    0
                  )
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce(
                    (acc, batter) => acc + batter.strikeouts,
                    0
                  )
                );
              }, 0)}
            </td>
            <td>
              {lineup.reduce((acc, order) => {
                return (
                  acc +
                  order.batters.reduce((acc, batter) => acc + batter.steals, 0)
                );
              }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
      <Subtitle>투수기록</Subtitle>
      <Table maincolumn={1}>
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
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
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
          <tr>
            <td>합</td>
            <td>
              {pitchers.reduce(
                (acc, pitcher) => acc + pitcher.innings_pitched,
                0
              )}
            </td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.batter_faced, 0)}
            </td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.pitches, 0)}
            </td>
            <td>{pitchers.reduce((acc, pitcher) => acc + pitcher.hits, 0)}</td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.homeruns, 0)}
            </td>
            <td>{pitchers.reduce((acc, pitcher) => acc + pitcher.walks, 0)}</td>
            <td>{pitchers.reduce((acc, pitcher) => acc + pitcher.hbps, 0)}</td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.strikeouts, 0)}
            </td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.runs_allowed, 0)}
            </td>
            <td>
              {pitchers.reduce((acc, pitcher) => acc + pitcher.earned_runs, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0 24px 0;
  gap: 8px;
`;

const Table = styled.table<{ maincolumn: number }>`
  align-self: center;
  width: 100%;
  border-collapse: collapse;

  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};

  thead {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  th {
    padding: 4px 0;
    background-color: ${({ theme }) => theme.colors.background300};
    color: ${({ theme }) => theme.colors.foreground900};
  }

  td {
    padding: 4px 0;
    text-align: center;
  }

  td:nth-child(${({ maincolumn }) => maincolumn}) {
    font-weight: bold;
    border-left: ${({ maincolumn, theme }) =>
      maincolumn === 1 ? "none" : "1px solid " + theme.colors.borderLight};
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  tr:last-child {
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.background300};

    td:nth-child(2) {
      border: none;
    }
  }
`;
