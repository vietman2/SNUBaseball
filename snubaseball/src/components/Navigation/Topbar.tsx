import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "@assets/images/logo.png";
import { AppIcon } from "@components/Icons";
import { TabType } from "@models/navigation";
import { tabs } from "@navigation/tabs";

const inactiveColor = "#333333";

export function Topbar() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);
  const [openSubmenuItems, setOpenSubmenuItems] = useState<TabType | null>(
    null
  );
  const submenuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    if (!tab.submenu) {
      setActiveTab(tab.title);
      setSubmenuOpen(false);
      setOpenSubmenuItems(null);
      navigate(tab.path);
    } else {
      setSubmenuOpen(!submenuOpen);
      setOpenSubmenuItems(tab);
    }
  };

  const handleSubmenuItemClick = (path: string) => {
    navigate(path);
    setActiveTab(openSubmenuItems?.title || "Home");
    setSubmenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Container>
        <LogoContainer>
          <img src={Logo} alt="logo" />
        </LogoContainer>
        <div>
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
        </div>
      </Container>
      {submenuOpen && openSubmenuItems && openSubmenuItems.submenu ? (
        <Submenu ref={submenuRef}>
          {openSubmenuItems.submenu.map((item) => (
            <SubmenuItem
              key={item.title}
              onClick={() => handleSubmenuItemClick(item.path)}
            >
              <AppIcon icon={item.icon} size={24} color="#000" />
              {item.title}
            </SubmenuItem>
          ))}
        </Submenu>
      ) : null}
    </>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  z-index: 10;

  > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #0f0f70;
  font-size: 24px;
  font-weight: 700;

  img {
    width: 60px;
    height: 60px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Tab = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
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

const Submenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 150px;

  padding: 0 20%;
  gap: 24px;

  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const SubmenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  gap: 16px;

  cursor: pointer;
  border: 1px solid #f0f0f0;
  border-radius: 16px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
