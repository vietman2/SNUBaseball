import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleDailySchedule } from "@data/schedule";
import { DailyScheduleType } from "@models/schedule";

export function DailySchedule() {
  const [schedule, setSchedule] = useState<DailyScheduleType>();

  useEffect(() => {
    setSchedule(sampleDailySchedule);
  }, []);

  if (!schedule) {
    return null;
  }

  return (
    <Container>
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
  padding: 12px 24px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.foreground500};
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
    font-size: 14px;

    div {
      padding: 8px 16px;
      border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
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
    background-color: ${({ theme }) => theme.colors.background300};
    border-radius: 8px 8px 0 0;
  }

  > div:last-child {
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background100};
    border-radius: 0 0 8px 8px;
  }
`;

const Timetable = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > div {
    display: flex;
    flex: 1;

    font-size: 14px;
    text-align: flex-start;
    color: ${({ theme }) => theme.colors.foreground900};
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

    div {
      padding: 8px 16px;
      border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
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
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background300};
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

  color: ${({ theme }) => theme.colors.foreground900};
  font-size: 14px;

  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background700};
`;
