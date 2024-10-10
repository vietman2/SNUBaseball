import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ToggleButton } from "@components/Buttons";
import {
  sampleWeeklyData,
  sampleManagerWeeklyData,
} from "@data/schedule/weekly";
import { DailyPersonalScheduleType, WeeklyTimetableType } from "@models/schedule";

export function WeeklyTable() {
  const [players, setPlayers] = useState<WeeklyTimetableType[]>([]);
  const [managers, setManagers] = useState<WeeklyTimetableType[]>([]);
  const [viewReason, setViewReason] = useState<boolean>(false);

  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredColumn(index);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const handleToggleReason = () => {
    setViewReason(!viewReason);
  }

  useEffect(() => {
    setPlayers(sampleWeeklyData);
    setManagers(sampleManagerWeeklyData);
  }, []);

  const renderAttendance = (schedule: DailyPersonalScheduleType) => {
    if (schedule.attendance === "O") return "O";
    else {
      return viewReason ? schedule.reason : schedule.attendance;
    }
  }

  const playerRows = useMemo(() => {
    return players.map((player) => (
      <tr key={player.index}>
        <td>{player.name}</td>
        <td>{player.major}</td>
        <td>{player.phone}</td>
        <td>{player.year}</td>
        {player.dailySchedules.map((schedule, index) => (
          <TableData key={index} hoveredcolumn={hoveredColumn}>
            {renderAttendance(schedule)}
          </TableData>
        ))}
        <td>{player.total}</td>
      </tr>
    ));
  }, [players, hoveredColumn, viewReason]);

  const playerSumRow = useMemo(
    () => (
      <SumRow>
        <td colSpan={4}>합</td>
        {Array.from({ length: 6 }).map((_, i) => (
          <td key={i}>
            {players.reduce((acc, cur) => {
              return acc + (cur.dailySchedules[i].attendance === "O" ? 1 : 0);
            }, 0)}
          </td>
        ))}
        <td />
      </SumRow>
    ),
    [players]
  );

  const managerRows = useMemo(() => {
    return managers.map((manager) => (
      <tr key={manager.index}>
        <td>{manager.name}</td>
        <td>{manager.major}</td>
        <td>{manager.phone}</td>
        <td>{manager.year}</td>
        {manager.dailySchedules.map((schedule, index) => (
          <TableData key={index} hoveredcolumn={hoveredColumn}>
            {renderAttendance(schedule)}
          </TableData>
        ))}
        <td>{manager.total}</td>
      </tr>
    ));
  }, [managers, hoveredColumn, viewReason]);

  const managerSumRow = useMemo(
    () => (
      <SumRow>
        <td colSpan={4}>합</td>
        {Array.from({ length: 6 }).map((_, i) => (
          <td key={i}>
            {managers.reduce((acc, cur) => {
              return acc + (cur.dailySchedules[i].attendance === "O" ? 1 : 0);
            }, 0)}
          </td>
        ))}
        <td />
      </SumRow>
    ),
    [managers]
  );

  return (
    <Container>
      <WeeklyRules>
        <div>{"<주간훈참규칙>"}</div>
        <div>{"- 화, 목, 토 3 필참입니다."}</div>
        <Duties>
          <div>{"9/24(화) 물 뿌리기 담당: 유찬휘, 이상현, 심민수"}</div>
          <div>{"9/26(목) 물 뿌리기 담당: 양서진, 김택원, 심민수"}</div>
          <div>{"9/28(토) 부실청소: 이유용, 이두희, 손주형"}</div>
        </Duties>
      </WeeklyRules>
      <Indeces>
        <div>
          <div>{"09.23~09.28"}</div>
          <div>
            사유 보기
            <ToggleButton
              isOn={viewReason}
              onClick={handleToggleReason}
            />
          </div>
        </div>
        <div>{"* 부상자 이름은 빨간색으로 표시"}</div>
      </Indeces>
      <TableWrapper>
        <Table hoveredcolumn={hoveredColumn}>
          <colgroup>
            <col style={{ width: "7%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>이름</th>
              <th>전공</th>
              <th>전화번호</th>
              <th>학년</th>
              <th
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                월
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
              >
                화
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
              >
                수
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
              >
                목
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave}
              >
                금
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(9)}
                onMouseLeave={handleMouseLeave}
              >
                토
              </th>
              <th>합</th>
            </tr>
          </thead>
          <tbody>
            {playerRows}
            {playerSumRow}
            {managerRows}
            {managerSumRow}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeeklyRules = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;

  font-size: 14px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.foreground900};
  background-color: ${({ theme }) => theme.colors.background100};
  border-radius: 8px;

  > div {
    padding: 4px 8px;
  }

  > div:nth-child(2) {
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const Duties = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  font-weight: 400;

  border-bottom: none;

  div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.primary};
  }

  > div:nth-child(3) {
    color: ${({ theme }) => theme.colors.foreground100};
  }
`;

const Indeces = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px;
  gap: 8px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.foreground500};

    > div:nth-child(2) {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  > div:nth-child(2) {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const TableWrapper = styled.div`
  position: relative;
  min-width: 800px;
`;

const Table = styled.table<{ hoveredcolumn: number | null }>`
  width: 100%;
  font-size: 14px;

  border-collapse: collapse;
  border: 1px solid #ddd;
  table-layout: fixed;
  background-color: ${({ theme }) => theme.colors.background100};

  thead {
    background-color: ${({ theme }) => theme.colors.borderLight};
  }

  th {
    border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
    padding: 7px;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondary};
  }
  th {
    ${({ hoveredcolumn, theme }) =>
      hoveredcolumn !== null &&
      `&:hover {
        cursor: pointer;
        background-color: ${theme.colors.background300};
      }`}
  }

  td {
    border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
    padding: 7px;
    text-align: center;
    color: ${({ theme }) => theme.colors.foreground900};
  }
`;

const SumRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.borderLight};

  td {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TableData = styled.td<{ hoveredcolumn: number | null }>`
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background300};
  }

  ${({ hoveredcolumn, theme }) =>
    hoveredcolumn !== null &&
    `&:nth-child(${hoveredcolumn + 1}) {
        background-color: ${theme.colors.background300};
      }`}
`;
