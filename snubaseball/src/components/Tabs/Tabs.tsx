import styled from "styled-components";

import { SubTab } from "@navigation/tabs";

interface Props {
  tabs: SubTab[];
  selectedTab: SubTab;
  setSelectedTab: (index: SubTab) => void;
}

export function Tabs({ tabs, selectedTab, setSelectedTab }: Props) {
  const handleTabClick = (tab: SubTab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      {tabs?.map((tab) => (
        <Tab
          key={tab.title}
          selected={tab.title === selectedTab.title}
          onClick={() => handleTabClick(tab)}
          data-testid={`tab-${tab.title}`}
        >
          {tab.title}
        </Tab>
      ))}
    </Container>
  );
}

export function EmptyTabs() {
  return <Container />;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #0f0f70;
`;

const Tab = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  color: ${(props) => (props.selected ? "#0f0f70" : "#fff")};
  background-color: ${(props) => (props.selected ? "#aaa" : "#0f0f70")};
  cursor: pointer;
`;
