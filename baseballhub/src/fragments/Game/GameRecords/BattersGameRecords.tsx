import styled from "styled-components";

import { LineupType } from "@models/records/game";

interface Props {
  lineup: LineupType;
}

export function BattersGameRecords({ lineup }: Readonly<Props>) {
  return (
    <Container>
      <Table>
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

  td:nth-child(2) {
    font-weight: bold;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
