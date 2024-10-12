import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  sampleWeeklyData,
  sampleManagerWeeklyData,
} from "@data/schedule";
import {
  DailyPersonalScheduleType,
  WeeklyTimetableType,
} from "@models/schedule";

interface Props {
  viewReason: boolean;
}

export function WeeklyTable({ viewReason }: Readonly<Props>) {
  const [players, setPlayers] = useState<WeeklyTimetableType[]>([]);
  const [managers, setManagers] = useState<WeeklyTimetableType[]>([]);

  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredColumn(index);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  useEffect(() => {
    setPlayers(sampleWeeklyData);
    setManagers(sampleManagerWeeklyData);
  }, []);

  const renderAttendance = (schedule: DailyPersonalScheduleType) => {
    if (schedule.attendance === "O") return "O";
    else {
      return viewReason ? schedule.reason : schedule.attendance;
    }
  };

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
    <Table hoveredcolumn={hoveredColumn}>
      <colgroup>
        <col style={{ width: "80px" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "40px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
        <col style={{ width: "60px" }} />
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
  );
}

const Table = styled.table<{ hoveredcolumn: number | null }>`
  width: 100%;
  font-size: 14px;

  border-collapse: collapse;
  border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
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
