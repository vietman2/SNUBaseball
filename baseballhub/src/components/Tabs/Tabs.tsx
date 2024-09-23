import styled from "styled-components";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  type?: 1 | 2;
}

export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  type = 1,
}: Readonly<Props>) {
  if (type === 1) {
    return (
      <Container1>
        {tabs.map((tab) => (
          <Tab1
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            data-testid={tab}
          >
            {tab}
          </Tab1>
        ))}
      </Container1>
    );
  } else {
    return (
      <Container2>
        {tabs.map((tab) => (
          <Tab2
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            data-testid={tab}
          >
            {tab}
          </Tab2>
        ))}
      </Container2>
    );
  }
}

const Container1 = styled.div`
  display: flex;
  gap: 5px;
  margin: 0 8px;
  padding: 0 8px 8px 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab1 = styled.div<{ $active: boolean }>`
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

const Container2 = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  border-radius: 16px 16px 0 0;

  background-color: ${({ theme }) => theme.colors.offWhite};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab2 = styled.div<{ $active: boolean }>`
  padding: 8px 16px;
  cursor: pointer;

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.sapphire};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : `2px solid transparent`};

  transition: border-bottom 0.3s linear;
`;
