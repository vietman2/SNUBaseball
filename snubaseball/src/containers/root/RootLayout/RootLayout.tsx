import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "@components/Sidebar";
import { FullTopBar, MobileTopbar } from "@components/TopBar";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  const navigate = useNavigate();

  const handleOrientationChange = () => {
    setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleNavigate = (path: string) => {
    navigate(path);

    if (isPortrait) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleOrientationChange);
    return () =>
      mediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  return (
    <>
      <MainContainer>
        {isPortrait ? (
          <>
            <MobileTopbar
              navigate={handleNavigate}
              openSidebar={openSidebar}
            />
            <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </>
        ) : (
          <FullTopBar navigate={navigate} />
        )}
      </MainContainer>
      <Outlet />
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;
