import styled from "styled-components";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Tabs(props: Readonly<Props>) {
  return (
    <Container>
      {props.tabs.map((tab) => (
        <Tab
          key={tab}
          $active={props.activeTab === tab}
          onClick={() => props.setActiveTab(tab)}
          data-testid={tab}
        >
          {tab}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 5px;
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 5px 15px;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "white" : "#f0f0f0")};
  color: ${(props) => (props.$active ? "black" : "gray")};
`;
