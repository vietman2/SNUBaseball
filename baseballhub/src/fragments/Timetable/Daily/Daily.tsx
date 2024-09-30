import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { sampleDailySchedule } from "@data/schedule/daily";
import { DailyScheduleType } from "@models/schedule";

interface Props {
  handleDayChange: (day: string) => void;
}

export function Daily({ handleDayChange }: Readonly<Props>) {
  const [schedule, setSchedule] = useState<DailyScheduleType>();

  const handleBack = () => {
    handleDayChange("전체");
  };

  useEffect(() => {
    setSchedule(sampleDailySchedule);
  }, []);

  if (!schedule) {
    return null;
  }

  return (
    <Container>
      <Horizontal onClick={handleBack}>
        <AppIcon icon="chevron-left" size={32} color={"#0f0f70"} />
        뒤로
      </Horizontal>
      <Subtitle>훈련 개요</Subtitle>
      <Outline>
        <div>
          <div>날짜</div>
          <div>{schedule.date}</div>
          <div>시간</div>
          <div>{schedule.time}</div>
          <div>집합장소</div>
          <div>{schedule.location}</div>
        </div>
        <div>
          <div>훈련목표</div>
          <div>{schedule.goal}</div>
          <div>일일코치</div>
          <div>{schedule.coach}</div>
          <div>강수확률</div>
          <div>{schedule.weather}</div>
        </div>
      </Outline>
      <Subtitle>훈련계획표</Subtitle>
      <Timetable>
        <div>
          <div>시간</div>
          <div>프로그램</div>
          <div>장소</div>
          <div>비고</div>
        </div>
        {schedule.timetables.map((timetable) => (
          <div key={timetable.time}>
            <div>{timetable.time}</div>
            <div>{timetable.program}</div>
            <div>{timetable.location}</div>
            <div>{timetable.note}</div>
          </div>
        ))}
      </Timetable>
      <Notes>
        <div>{"<훈련 피드백>"}</div>
      </Notes>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
  gap: 16px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: 8px;
  border-radius: 16px;

  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.offWhite};
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grayText};
`;

const Outline = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  margin-bottom: 16px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;

    div {
      padding: 8px 16px;
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }

    div:last-child {
      border-right: none;
    }

    div:nth-child(odd) {
      flex: 1;
    }

    div:nth-child(even) {
      flex: 2;
    }
  }

  > div:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryContainer};
    border-radius: 8px 8px 0 0;
  }

  > div:last-child {
    color: ${({ theme }) => theme.colors.sapphire};
    background-color: ${({ theme }) => theme.colors.offWhite};
    border-radius: 0 0 8px 8px;
  }
`;

const Timetable = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.offWhite};

  > div {
    display: flex;
    flex: 1;

    font-size: 12px;
    text-align: flex-start;
    color: ${({ theme }) => theme.colors.sapphire};
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    div {
      padding: 8px 16px;
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }

    div:last-child {
      border-right: none;
    }

    div:nth-child(odd) {
      flex: 1;
    }

    div:nth-child(even) {
      flex: 4;
    }
  }

  > div:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.sapphire};
    background-color: ${({ theme }) => theme.colors.primaryContainer};
    border-radius: 8px 8px 0 0;
    border-top: none;
  }
`;

const Notes = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 24px;
  padding: 16px;

  font-size: 12px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;
