import styled from "styled-components";

interface Props {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (index: string) => void;
}

export function SubTabs({ tabs, selectedTab, setSelectedTab }: Props) {
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      {tabs?.map((tab) => (
        <Tab
          key={tab}
          selected={tab === selectedTab}
          onClick={() => handleTabClick(tab)}
          data-testid={`tab-${tab}`}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const Tab = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 15px;
  color: ${(props) => (props.selected ? "#0f0f70" : "#000")};
  background-color: ${(props) => (props.selected ? "#aaa" : "#b6d3ed")};
  cursor: pointer;
`;
