import styled from "styled-components";

import { DailyScheduleType, WeeklyTimetableType } from "@models/schedule";

interface Props {
  items: WeeklyTimetableType[];
}

export function WeeklyTable({ items }: Readonly<Props>) {
  const renderContent = (schedule: DailyScheduleType) => {
    if (schedule.attendance === "O") {
      return "O";
    }
    if (schedule.attendance === "X") {
      return `${schedule.reason}`;
    }
    if (schedule.attendance === "△") {
      return `${schedule.time} ${schedule.reason}`;
    }
    return "";
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: "2.5%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "3%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "9%" }} />
        <col style={{ width: "2.5%" }} />
      </colgroup>
      <TableHeader>
        <TableRow>
          <th>No</th>
          <th>이름</th>
          <th>전공</th>
          <th>전화번호</th>
          <th>학년</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>일</th>
          <th>합</th>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.index}>
            <td>{item.index}</td>
            <td>{item.name}</td>
            <td>{item.major}</td>
            <td>{item.phone}</td>
            <td>{item.year}</td>
            <ScheduleData attendance={item.monday.attendance}>
              {renderContent(item.monday)}
            </ScheduleData>
            <ScheduleData attendance={item.tuesday.attendance}>
              {renderContent(item.tuesday)}
            </ScheduleData>
            <ScheduleData attendance={item.wednesday.attendance}>
              {renderContent(item.wednesday)}
            </ScheduleData>
            <ScheduleData attendance={item.thursday.attendance}>
              {renderContent(item.thursday)}
            </ScheduleData>
            <ScheduleData attendance={item.friday.attendance}>
              {renderContent(item.friday)}
            </ScheduleData>
            <ScheduleData attendance={item.saturday.attendance}>
              {renderContent(item.saturday)}
            </ScheduleData>
            <ScheduleData attendance={item.sunday.attendance}>
              {renderContent(item.sunday)}
            </ScheduleData>
            <td>{item.total}</td>
          </TableRow>
        ))}
        <TableRow>
          <td colSpan={5}>합계</td>
          <td>1</td>
          <td>2</td>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const Table = styled.table`
  width: 99%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;

  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;

const ScheduleData = styled.td<{ attendance: string }>`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: ${(props) =>
    props.attendance === "O"
      ? "#c8e6c9"
      : props.attendance === "X"
      ? "#ffcdd2"
      : "#fff9c4"};
`;
