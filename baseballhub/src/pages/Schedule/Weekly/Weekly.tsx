import { useEffect, useState } from "react";
import styled from "styled-components";

import { WeeklyTable } from "@components/Tables";
import { Tabs } from "@components/Tabs";
import { sampleWeeklyData } from "@data/weekly";
import { WeeklyTimetableType } from "@models/schedule";

const tabs = ["이번주", "과거 훈참표 조회"];

export default function Weekly() {
  const [selectedTab, setSelectedTab] = useState<string>("이번주");
  const [items, setItems] = useState<WeeklyTimetableType[]>([]);

  const today = new Date();
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  );
  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + (today.getDay() === 0 ? 0 : 7)
  );

  const formatDate = (date: Date) => {
    // return (MM/DD)
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  useEffect(() => {
    setItems(sampleWeeklyData);
  }, []);

  return (
    <Container>
      <Title>훈련참가표</Title>
      <Tabs tabs={tabs} activeTab={selectedTab} setActiveTab={setSelectedTab} />
      <Content>
        {selectedTab === "이번주" ? (
          <>
            <Subtitle>
              {formatDate(monday)} ~ {formatDate(sunday)}
            </Subtitle>
            <div>TODO 1: 부상선수 다른색 표시</div>
            <div>TODO 2: 주말되면 다음주 훈참표 작성</div>
            <div>TODO 3: 물뿌리기, 부실청소 당번</div>
            <div>* 주간 훈참 규칙 명시하기..?</div>
            <WeeklyTable items={items} />
          </>
        ) : null}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Content = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Subtitle = styled.h3`
  margin: 0 0 1rem 0 ;
`;
