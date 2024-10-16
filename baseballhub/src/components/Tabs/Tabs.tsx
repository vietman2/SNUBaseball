import styled from "styled-components";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  type?: 1 | 2;
  textSize?: "small" | "large";
}

export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  type = 1,
  textSize = "large",
}: Readonly<Props>) {
  if (type === 1) {
    return (
      <Container1>
        {tabs.map((tab) => (
          <Tab1
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            $textsize={textSize}
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
  gap: 16px;
  padding: 8px;
`;

const Tab1 = styled.div<{ $active: boolean; $textsize: "small" | "large" }>`
  padding: ${({ $textsize }) => ($textsize === "small" ? "4px 8px" : "8px 16px")};

  font-size: ${({ $textsize }) => ($textsize === "small" ? "14px" : "18px")};
  font-weight: ${({ $active }) => ($active ? "700" : "400")};

  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground900};

  transition: background-color 0.3s ease-in-out;
`;

const Container2 = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  border-radius: 16px 16px 0 0;

  background-color: ${({ theme }) => theme.colors.background100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Tab2 = styled.div<{ $active: boolean }>`
  padding: 8px 8px;
  cursor: pointer;

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground900};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : `2px solid transparent`};

  transition: border-bottom 0.3s linear;
`;
