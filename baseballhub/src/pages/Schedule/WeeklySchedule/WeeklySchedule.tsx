import { useState } from "react";
import styled from "styled-components";

import { SimpleSelector } from "@components/Selectors";
import { WeeklyTable } from "@fragments/Timetable";

const yearOptions = ["2024년", "2023년", "2022년", "2021년"];
const monthOptions = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
];
const weekOptions = ["첫째 주", "둘째 주", "셋째 주", "넷째 주"];

export function WeeklySchedule() {
  const [selectedYear, setSelectedYear] = useState<string>("2024년");
  const [selectedMonth, setSelectedMonth] = useState<string>("9월");
  const [selectedWeek, setSelectedWeek] = useState<string>("셋째 주");

  return (
    <Container>
      <Selectors>
        <SimpleSelector
          options={yearOptions}
          selected={selectedYear}
          onSelect={setSelectedYear}
        />
        <SimpleSelector
          options={monthOptions}
          selected={selectedMonth}
          onSelect={setSelectedMonth}
        />
        <SimpleSelector
          options={weekOptions}
          selected={selectedWeek}
          onSelect={setSelectedWeek}
        />
      </Selectors>
      <TableContainer>
        <WeeklyTable />
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 16px 8px 28px;
  
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Selectors = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const TableContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0 8px 24px 0;
`;
