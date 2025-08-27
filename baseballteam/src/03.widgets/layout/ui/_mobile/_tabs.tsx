import { useNavigate } from "react-router";
import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { useTabs, type TabType } from "@shared/lib/navigation";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  isTabsOpen: boolean;
  setIsTabsOpen: (isOpen: boolean) => void;
}

export function MobileTabs({ isTabsOpen, setIsTabsOpen }: Readonly<Props>) {
  const { activeTab, tabGroups } = useTabs();
  const { colors } = useColors();
  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    navigate(tab.path);
    setIsTabsOpen(false);
  };

  return (
    <Tabs $isOpen={isTabsOpen}>
      {tabGroups.map((tabgroup) => (
        <div key={tabgroup.title}>
          <div>{tabgroup.title}</div>
          {tabgroup.tabs.map((tab) => (
            <TabItem
              key={tab.title}
              onClick={() => handleTabClick(tab)}
              $isActive={activeTab === tab}
              data-testid={tab.title}
            >
              <AppIcon
                icon={tab.icon}
                size={24}
                color={activeTab === tab ? colors.primary : colors.text500}
              />
              {tab.title}
            </TabItem>
          ))}
        </div>
      ))}
    </Tabs>
  );
}

const Tabs = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 48px);
  padding: 16px;
  gap: 16px;

  position: fixed;
  top: 48px;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};

  background-color: ${({ theme }) => theme.colors.background300};
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-size: 1rem;
    font-weight: 600;
  }
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.text500};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background500 : "transparent"};
`;
