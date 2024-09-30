import styled from "styled-components";

import { Chip } from "@components/Chips";
import { useWindowSize } from "@hooks/useWindowSize";

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  type?: 1 | 2 | 3;
}

export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  type = 1,
}: Readonly<Props>) {
  const { width } = useWindowSize();

  if (type === 1) {
    return (
      <Container1 $wide={width > 768}>
        {tabs.map((tab) => (
          <Tab1
            key={tab}
            $active={activeTab === tab}
            $wide={width > 768}
            onClick={() => setActiveTab(tab)}
            data-testid={tab}
          >
            {tab}
          </Tab1>
        ))}
      </Container1>
    );
  } else if (type === 2) {
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
  } else {
    return (
      <Container3>
        {tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            bgColor={tab === activeTab ? "#0F0F70" : "#B5B6B6"}
            color={tab === activeTab ? "#E8E6F2" : "#0B1623"}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </Container3>
    );
  }
}

const Container1 = styled.div<{ $wide: boolean }>`
  display: flex;
  gap: 4px;
  margin: ${({ $wide }) => ($wide ? "0 8px" : "0 4px")};
  padding: ${({ $wide }) => ($wide ? "0 8px 8px 8px" : "0 4px 8px 4px")};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab1 = styled.div<{ $active: boolean, $wide: boolean }>`
  padding: ${({ $wide }) => ($wide ? "8px 16px" : "4px 8px")};
  border-radius: ${({ $wide }) => ($wide ? "16px" : "8px")};

  font-size: 16px;

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

const Container3 = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
