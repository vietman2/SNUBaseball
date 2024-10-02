import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { TabType, tabs } from "@navigation/tabs";

const inactiveColor = "#333333";

export function Topbar() {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab.title);

    if (!tab.submenu) {
      navigate(tab.path);
      return;
    }

    if (activeTab === tab.title) {
      return;
    }
  };

  return (
    <Container>
      {tabs.map((tab) => (
        <Tab
          key={tab.title}
          onClick={() => handleTabClick(tab)}
          $active={activeTab === tab.title}
        >
          <AppIcon
            icon={tab.icon}
            size={20}
            color={activeTab === tab.title ? "#0f0f70" : inactiveColor}
          />
          {tab.title}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  color: #fff;
  gap: 20px;
`;

const Tab = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  gap: 4px;

  color: ${({ $active }) => ($active ? "#0f0f70" : "#000")};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  background-color: ${({ $active }) => ($active ? "#fff" : "transparent")};
  border-radius: 16px;
  transition: background-color 0.3s ease-in-out;
`;
