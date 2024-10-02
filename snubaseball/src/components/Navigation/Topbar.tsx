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
    setActiveTab(tab.title);

    if (!tab.submenu) {
      setSubmenuOpen(false);
      setOpenSubmenuItems(null);
      navigate(tab.path);
      return;
    } else {
      setSubmenuOpen(!submenuOpen);
      setOpenSubmenuItems(tab);
    }
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

  const handleSubmenuItemClick = (path: string) => {
    navigate(path);
    setSubmenuOpen(false);
  };

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
    width: 50px;
    height: 50px;
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
  justify-content: space-around;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

const SubmenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
