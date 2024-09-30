import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  sampleWeeklyData,
  sampleManagerWeeklyData,
} from "@data/schedule/weekly";
import {
  DailyPersonalScheduleType,
  WeeklyTimetableType,
} from "@models/schedule";

interface Props {
  handleDayChange: (day: string) => void;
}

export function Weekly({ handleDayChange }: Readonly<Props>) {
  const [players, setPlayers] = useState<WeeklyTimetableType[]>([]);
  const [managers, setManagers] = useState<WeeklyTimetableType[]>([]);
  const [selected, setSelected] = useState<DailyPersonalScheduleType | null>(
    null
  );
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredColumn(index);
  };

  const handleMouseEnterOnCell = (
    schedule: DailyPersonalScheduleType,
    event: React.MouseEvent<HTMLTableCellElement>
  ) => {
    setSelected(schedule);

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetParentRect =
      event.currentTarget.offsetParent?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

    // Calculate the position to display the hover menu
    const top = rect.top - offsetParentRect.top;
    const left = rect.left - offsetParentRect.left + rect.width * 0.75;

    setPosition({ top, left });
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
    setSelected(null);
    setPosition(null);
  };

  const renderMenu = () => {
    if (selected && selected.attendance !== "O" && position) {
      return (
        <HoverMenu position={position}>
          {selected.time && <p>시간: {selected.time}</p>}
          {selected.reason && <p>{selected.reason}</p>}
        </HoverMenu>
      );
    }
  };

  useEffect(() => {
    setPlayers(sampleWeeklyData);
    setManagers(sampleManagerWeeklyData);
  }, []);

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
        <div>{"09.23~09.28"}</div>
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
                onClick={() => handleDayChange("월요일")}
              >
                월
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDayChange("화요일")}
              >
                화
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDayChange("수요일")}
              >
                수
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDayChange("목요일")}
              >
                목
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDayChange("금요일")}
              >
                금
              </th>
              <th
                onMouseEnter={() => handleMouseEnter(9)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDayChange("토요일")}
              >
                토
              </th>
              <th>합</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.index}>
                <td>{player.name}</td>
                <td>{player.major}</td>
                <td>{player.phone}</td>
                <td>{player.year}</td>
                {player.dailySchedules.map((schedule, index) => (
                  <TableData
                    key={index}
                    onMouseEnter={(event) =>
                      handleMouseEnterOnCell(schedule, event)
                    }
                    onMouseLeave={handleMouseLeave}
                    hoveredcolumn={hoveredColumn}
                  >
                    {schedule.attendance}
                  </TableData>
                ))}
                <td>{player.total}</td>
              </tr>
            ))}
            <SumRow>
              <td colSpan={4}>합</td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[0].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[1].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[2].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[3].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[4].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {players.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[5].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
            </SumRow>
            {managers.map((manager) => (
              <tr key={manager.index}>
                <td>{manager.name}</td>
                <td>{manager.major}</td>
                <td>{manager.phone}</td>
                <td>{manager.year}</td>
                {manager.dailySchedules.map((schedule, index) => (
                  <TableData
                    key={index}
                    onMouseEnter={(event) =>
                      handleMouseEnterOnCell(schedule, event)
                    }
                    onMouseLeave={handleMouseLeave}
                    hoveredcolumn={hoveredColumn}
                    data-testid="manager-schedule"
                  >
                    {schedule.attendance}
                  </TableData>
                ))}
                <td>{manager.total}</td>
              </tr>
            ))}
            <SumRow>
              <td colSpan={4}>합</td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[0].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[1].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[2].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[3].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[4].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
              <td>
                {managers.reduce((acc, cur) => {
                  return (
                    acc + (cur.dailySchedules[5].attendance === "O" ? 1 : 0)
                  );
                }, 0)}
              </td>
            </SumRow>
          </tbody>
        </Table>
        {renderMenu()}
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

  background-color: ${({ theme }) => theme.colors.offWhite};
  border-radius: 8px;

  > div {
    padding: 4px 8px;
  }

  > div:nth-child(2) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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

    color: ${({ theme }) => theme.colors.linkText};
  }

  > div:nth-child(3) {
    color: ${({ theme }) => theme.colors.tertiaryText};
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

  div:nth-child(1) {
    color: ${({ theme }) => theme.colors.grayText};
  }

  div:nth-child(2) {
    color: ${({ theme }) => theme.colors.accentText};
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
  background-color: ${({ theme }) => theme.colors.offWhite};

  thead {
    background-color: ${({ theme }) => theme.colors.border};
  }

  th {
    border: 1px solid #ddd;
    padding: 7px;
    text-align: center;
  }
  th {
    ${({ hoveredcolumn, theme }) =>
      hoveredcolumn !== null &&
      `&:hover {
        cursor: pointer;
      background-color: ${theme.colors.lavender};
      }`}
  }

  td {
    border: 1px solid #ddd;
    padding: 7px;
    text-align: center;
  }
`;

const SumRow = styled.tr`
  background-color: #f5f5f5 !important;
`;

const TableData = styled.td<{ hoveredcolumn: number | null }>`
  &:hover {
    background-color: ${({ theme }) => theme.colors.lavender};
  }

  transition: background-color 0.3s;

  ${({ hoveredcolumn, theme }) =>
    hoveredcolumn !== null &&
    `&:nth-child(${hoveredcolumn + 1}) {
        background-color: ${theme.colors.lavender};
      }`}
`;

const HoverMenu = styled.div<{
  position: { top: number; left: number };
}>`
  position: absolute;
  top: ${({ position }) => position.top}px;
  left: ${({ position }) => position.left}px;
  background-color: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  border-radius: 5px;
  z-index: 100;

  p {
    margin: 0;
    font-size: 12px;
  }
`;
