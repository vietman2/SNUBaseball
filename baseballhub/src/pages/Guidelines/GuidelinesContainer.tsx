import { useState } from "react";
import styled from "styled-components";

import { Guidelines } from "./Guidelines/Guidelines";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["내야", "외야", "포수", "투구", "타격", "주루", "기타"];

export default function GuidelinesContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("내야");

  const { width } = useWindowSize();

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="훈련 가이드라인"
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
      <Content>
        <Guidelines selectedCategory={selectedTab} />
      </Content>
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
