import { useState } from "react";
import styled from "styled-components";

import { TabType, tabs } from "@navigation/tabs";

export function Topbar() {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);

  return(
    <Container>
      {tabs.map((tab) => (
        <Tab key={tab.title} onClick={() => setActiveTab(tab)}>
          {tab.title}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
  color: #fff;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;
