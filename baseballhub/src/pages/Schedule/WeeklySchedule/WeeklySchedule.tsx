import { useState } from "react";
import styled from "styled-components";

import { ToggleButton } from "@components/Buttons";
import { SimpleSelector } from "@components/Selectors";
import { WeeklyTable } from "@fragments/Timetable";
import { useWindowSize } from "@hooks/useWindowSize";

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
  const [viewReason, setViewReason] = useState<boolean>(false);

  const { width } = useWindowSize();

  const handleToggleReason = () => {
    setViewReason(!viewReason);
  };

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
            <ToggleButton isOn={viewReason} onClick={handleToggleReason} />
          </div>
        </div>
        <div>{"* 부상자 이름은 빨간색으로 표시"}</div>
      </Indeces>
      <TableContainer offset={width > 768 ? "300px" : "48px"}>
        <WeeklyTable viewReason={viewReason} />
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 16px 32px 16px;

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

const TableContainer = styled.div<{ offset: string }>`
  display: block;
  flex: 1;
  flex-direction: column;
  width: calc(100vw - ${({ offset }) => offset});
  margin: 16px 0;

  overflow-x: auto;
  white-space: nowrap;
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
  flex-wrap: wrap;

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
