import { useState } from "react";
import styled from "styled-components";

import { GuidelineDetail } from "./GuidelineDetail/GuidelineDetail";
import { GuidelineList } from "./GuidelineList/GuidelineList";
import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineSimpleType } from "@models/guidelines";

const tabs = ["내야", "외야", "포수", "투구", "타격", "주루", "기타"];

export default function GuidelinesContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("내야");
  const [selectedGuideline, setSelectedGuideline] =
    useState<GuidelineSimpleType | null>(null);

  const { width } = useWindowSize();

  const setActiveTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    if (selectedGuideline !== null) {
      return (
        <GuidelineDetail
          guidelineId={selectedGuideline.id}
          goBack={() => setSelectedGuideline(null)}
        />
      );
    } else {
      return <GuidelineList selectedCategory={selectedTab!} onSelectGuideline={setSelectedGuideline} />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>훈련 가이드라인</Title>
          <VerticalDivider height="45%" bold />
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setActiveTab}
          />
        </PageHeader>
      ) : (
        <MobileHeader>
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setActiveTab}
            textSize="small"
          />
        </MobileHeader>
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
