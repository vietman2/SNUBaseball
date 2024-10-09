import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { TabType } from "@models/navigation";
import { tabs } from "@navigation/tabs";

interface Props {
  open: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ open, toggleSidebar }: Readonly<Props>) {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    if (!tab.submenu) {
      navigate(tab.path);
      toggleSidebar();
      return;
    }

    if (activeTab === tab) {
      setActiveTab(null);
      return;
    }

    setActiveTab(tab);
  };

  return (
    <>
      <Container open={open}>
        {tabs.map((tab) => (
          <div key={tab.title}>
            <SidebarTab onClick={() => handleTabClick(tab)}>
              {tab.title}
            </SidebarTab>
            {tab.submenu && (
              <SubMenu $active={activeTab === tab}>
                {tab.submenu.map((subtab) => (
                  <SubTab
                    key={subtab.title}
                    onClick={() => {
                      navigate(subtab.path);
                      toggleSidebar();
                    }}
                  >
                    {subtab.title}
                  </SubTab>
                ))}
              </SubMenu>
            )}
          </div>
        ))}
      </Container>
      <Overlay open={open} onClick={toggleSidebar} />
    </>
  );
}

interface SimpleProps {
  open: boolean;
}

const Container = styled.div<SimpleProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  color: black;
  padding-top: 1rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.2s ease-in-out;
  z-index: 1000;
`;

const SidebarTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0 0;
  padding: 20px 0px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #0f0f70;
    color: white;
  }
`;

const SubMenu = styled.div<{ $active: boolean }>`
  overflow: hidden;
  max-height: ${(props) => (props.$active ? "400px" : "0")};
  transition: max-height 0.3s ease-in-out;
  cursor: pointer;
  background-color: #0f0f70;
  color: white;
`;

const SubTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #080835;
    color: white;
  }
`;

const Overlay = styled.div<SimpleProps>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
