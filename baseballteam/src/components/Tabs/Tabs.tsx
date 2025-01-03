import styled from "styled-components";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, setActiveTab }: Readonly<Props>) {
  return (
    <Container>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          $active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
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
  justify-content: center;
  gap: 8px;
  border-radius: 16px 16px 0 0;

  background-color: ${({ theme }) => theme.colors.background700};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 8px 8px 4px 8px;
  cursor: pointer;

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground900};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : `2px solid transparent`};

  transition: border-bottom 0.3s linear;
`;
