import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainLogo from "@assets/images/logo.png";
import { AppIcon } from "@components/Icons";
import { palette } from "@constants/colors";
import { Tab, sidebarItems } from "@navigation/tabs";

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
  const [activeItem, setActiveItem] = useState<string>("");

  const navigate = useNavigate();

  const handleMouseEnter = (title: string) => {
    setActiveItem(title);
  };

  const handleMouseLeave = () => {
    setActiveItem("");
  };

  const handleMenuClick = (tab: Tab) => {
    if (!isSidebarOpen) {
      toggleSidebar();
    }

    if (tab.path) {
      navigate(tab.path);
    }
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <SidebarContainer $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <Logo src={MainLogo} alt="Main Logo" />
        </SidebarHeader>
        <SidebarContent>
          {sidebarItems.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <SidebarItem
                key={item.title}
                $isOpen={isSidebarOpen}
                onClick={() => handleMenuClick(item)}
                data-testid={item.title}
              >
                <AppIcon icon={item.icon} size={24} color="black" />
                {isSidebarOpen && <span>{item.title}</span>}
              </SidebarItem>
              {item.submenu && activeItem === item.title && isSidebarOpen ? (
                <SubMenu $active={activeItem === item.title}>
                  {item.submenu.map((submenu) => (
                    <SubMenuItem
                      key={submenu.title}
                      onClick={() => handleSubMenuClick(submenu.path)}
                      data-testid={submenu.title}
                    >
                      {submenu.title}
                    </SubMenuItem>
                  ))}
                </SubMenu>
              ) : null}
            </div>
          ))}
        </SidebarContent>
      </SidebarContainer>
      {isSidebarOpen ? (
        <SidebarToggleIcon onClick={toggleSidebar} data-testid="toggle">
          <AppIcon icon={"chevron-left"} size={24} color="black" />
        </SidebarToggleIcon>
      ) : null}
    </>
  );
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${palette.background};
  height: 100%;
  width: ${(props) => (props.$isOpen ? "250px" : "85px")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  transition: width 0.3s ease-in-out;
`;

const SidebarHeader = styled.div`
  padding: 40px 0;
  text-align: center;
`;

const Logo = styled.img`
  width: 85px;
  height: 85px;
`;

const SidebarContent = styled.div`
  padding: 30px 0;
`;

const SidebarItem = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: ${(props) =>
    props.$isOpen ? "10px 30px 0px 20px" : "10px 20px 0px 20px"};
  padding: 10px 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    border-radius: 10px;
    background-color: #ddd;
  }

  &:hover > div {
    display: block;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SubMenu = styled.div<{ $active: boolean }>`
  overflow: hidden;
  max-height: ${(props) => (props.$active ? "300px" : "0")};
  transition: max-height 0.3s ease-in-out;
  margin: 0px 30px 0px 20px;
  border-radius: 0px 0px 10px 10px;
  background-color: #e0e0e0;
`;

const SubMenuItem = styled.div`
  padding: 10px 40px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: white;
  }
`;

const SidebarToggleIcon = styled.div`
  position: fixed;
  top: 50%;
  left: 220px;
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  z-index: 101;
`;
