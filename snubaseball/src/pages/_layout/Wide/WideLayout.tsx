import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Logo } from "@components/Icons";
import { TabType, useNavigation } from "@contexts/navigation";

export function WideLayout() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { tabs } = useNavigation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTabClick = (tab: TabType) => {
    if (tab.subtabs.length > 0) {
      return;
    }

    navigate(tab.path);
  };

  return (
    <Container>
      <div onMouseLeave={() => setMenuOpen(false)} data-testid="wide-layout">
        <Header>
          <button onClick={handleHomeClick} data-testid="home-button">
            <Logo size={48} />
          </button>
          <Tabs onMouseOver={() => setMenuOpen(true)} data-testid="tabs">
            {tabs.map((tab) => (
              <div key={tab.title}>
                {tab.path !== "/" && (
                  <button
                    onClick={() => handleTabClick(tab)}
                    data-testid={`tab-${tab.title}`}
                  >
                    {tab.title}
                  </button>
                )}
              </div>
            ))}
          </Tabs>
        </Header>
        <Menu $isOpen={menuOpen}>
          {tabs.map((tab) => (
            <Tabs key={tab.title}>
              {tab.subtabs.length > 0 ? (
                <>
                  {tab.subtabs.map((subtab) => (
                    <button
                      key={subtab.title}
                      onClick={() => navigate(subtab.path)}
                      data-testid={`tab-${subtab.title}`}
                    >
                      {subtab.title}
                    </button>
                  ))}
                </>
              ) : (
                <>{tab.path !== "/" && <div />}</>
              )}
            </Tabs>
          ))}
        </Menu>
      </div>
      <Contents>
        <Outlet />
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 15%;

  background-color: ${({ theme }) => theme.colors.background300};

  > button:first-child {
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 36px;

  > button {
    display: flex;
    width: 64px;
    align-items: center;
    justify-content: center;
  }

  > div {
    display: flex;
    width: 64px;
    align-items: center;
    justify-content: center;
  }
`;

const Menu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  width: 100%;
  justify-content: flex-end;
  padding: 0 15%;
  gap: 36px;

  background-color: ${({ theme }) => theme.colors.background300};
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;

  > div {
    flex-direction: column;
    padding: 16px 0;
    gap: 24px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
`;
