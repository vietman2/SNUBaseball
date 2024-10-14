import { useState } from "react";
import styled from "styled-components";

import { DailySchedule } from "./DailySchedule/DailySchedule";
import { WeeklySchedule } from "./WeeklySchedule/WeeklySchedule";
import { ComingSoon, ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["주간 훈참표", "훈련계획표", "월간 캘린더"];

export default function ScheduleContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("주간 훈참표");

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("주간 훈참표");
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "주간 훈참표":
        return <WeeklySchedule />;
      case "훈련계획표":
        return <DailySchedule />;
      case "월간 캘린더":
        return <ComingSoon />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="스케줄"
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <MobileHeader
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
      <Content>{renderContent()}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
