import { useState } from "react";
import styled from "styled-components";

import { WeeklySchedule } from "./WeeklySchedule/WeeklySchedule";
import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["주간 훈참표", "월간 캘린더"];

export default function ScheduleContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("주간 훈참표");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "주간 훈참표":
        return <WeeklySchedule />;
      case "월간 캘린더":
        return <div>월간 캘린더</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>스케줄</Title>
          <VerticalDivider height="45%" bold />
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setSelectedTab}
          />
        </PageHeader>
      ) : (
        <MobileHeader>
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setSelectedTab}
            textSize="small"
          />
        </MobileHeader>
      )}
      <Content>{renderContent()}</Content>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
