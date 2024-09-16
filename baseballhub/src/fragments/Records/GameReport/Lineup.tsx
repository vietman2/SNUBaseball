import styled from "styled-components";

import { palette } from "@colors/palette";
import { OrderType } from "@models/records/game";

interface Props {
  lineup: [
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType
  ];
}

export function Lineup({ lineup }: Readonly<Props>) {
  return (
    <Container>
      <Title>선발 라인업</Title>
      <LineupTable>
        <TBody>
          {lineup.map((player) => (
            <tr key={player.order}>
              {player.order === 0 ? (
                <TD colSpan={2}>선발투수</TD>
              ) : (
                <>
                  <TD>{player.order}</TD>
                  <TD>{player.position}</TD>
                </>
              )}
              <TD>
                <span>{player.number}</span>
                <span style={{ marginLeft: 8 }}>{player.name}</span>
              </TD>
            </tr>
          ))}
        </TBody>
      </LineupTable>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
`;

const LineupTable = styled.table`
  width: 240px;
  margin: 16px 0;
  border-collapse: collapse;
  border: 1px solid ${palette.grayBorder};
  text-align: center;
`;

const TBody = styled.tbody`
  background-color: #ffffff;
`;

const TD = styled.td`
  padding: 8px;
  border: 1px solid ${palette.grayBorder};
`;
