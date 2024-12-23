import styled from "styled-components";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CategoryTabs({
  tabs,
  activeTab,
  setActiveTab,
}: Readonly<Props>) {
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
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 4px 12px;
  cursor: pointer;

  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground900};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : `2px solid transparent`};

  transition: border-bottom 0.3s linear;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.875rem;
  }
`;
