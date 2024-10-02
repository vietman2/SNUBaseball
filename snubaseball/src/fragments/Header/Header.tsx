import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "@assets/images/logo.png";
import { AppIcon } from "@components/Icons";
import { Sidebar, Topbar } from "@components/Navigation";
import { useWindowSize } from "@hooks/useWindowSize";

export function Header() {
  const [isWide, setIsWide] = useState<boolean>(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { width } = useWindowSize();

  const location = useLocation();
  const navigate = useNavigate();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleNavigate = (path: string) => {
    navigate(path);

    if (isWide) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsWide(width > 1024);
  }, [width]);

  return (
    <>
      <Container $isMain={location.pathname === "/"}>
        {isWide ? (
          <Bar>
            <LogoContainer
              onClick={() => handleNavigate("/")}
              data-testid="logo"
            >
              <img src={Logo} alt="logo" />
            </LogoContainer>
            <Topbar />
          </Bar>
        ) : (
          <MobileBar>
            <LogoContainer
              onClick={() => handleNavigate("/")}
              data-testid="logo"
            >
              <img src={Logo} alt="logo" />
            </LogoContainer>
            <Icon onClick={openSidebar} data-testid="open">
              <AppIcon icon="menu" size={32} color="black" />
            </Icon>
          </MobileBar>
        )}
      </Container>
      <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

const Container = styled.div<{ $isMain: boolean }>`
  width: 100vw;
  background-color: #f0f0f0;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20%;
  color: #000;
`;

const MobileBar = styled.div`
  display: flex;
  flex: 1,
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  color: #fff;

  padding: 20px 15px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
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
