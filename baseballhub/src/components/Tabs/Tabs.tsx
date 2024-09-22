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
  margin: 0 8px;
  padding: 0 8px 8px 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 5px 15px;
  border-radius: 16px;
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.offWhite : theme.colors.lavender};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.sapphire};
  border: ${({ $active, theme }) =>
    $active ? `1px solid ${theme.colors.border}` : `1px solid transparent`};

  transition: background-color 0.3s ease-in-out;
`;
