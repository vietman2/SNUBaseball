import styled from "styled-components";

import { palette } from "@colors/palette";
import { BattingOrderType, GamePitcherType } from "@models/records/game";

interface Props {
  lineup: [
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType,
    BattingOrderType
  ];
  pitcher: GamePitcherType;
}

export function Lineup({ lineup, pitcher }: Readonly<Props>) {
  return (
    <Container>
      <Title>선발 라인업</Title>
      <LineupTable>
        <TBody>
          {lineup.map((order) => (
            <tr key={order.order}>
              <Data>{order.order}</Data>
              <Data>{order.batters[0].positions[0]}</Data>
              <Data>
                <span>{order.batters[0].number}</span>
                <span style={{ marginLeft: 4 }}>{order.batters[0].name}</span>
              </Data>
            </tr>
          ))}
          <tr>
            <Data colSpan={2}>선발투수</Data>
            <Data>
              <span>{pitcher.number}</span>
              <span style={{ marginLeft: 4 }}>{pitcher.name}</span>
            </Data>
          </tr>
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

const Data = styled.td`
  padding: 8px;
  border: 1px solid ${palette.grayBorder};
`;
