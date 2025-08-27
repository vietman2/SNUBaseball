import { useNavigate } from "react-router";
import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { useTabs, type TabType } from "@shared/lib/navigation";
import { AppIcon } from "@shared/ui/Icons";
import { MainLogo } from "@shared/ui/Images";

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: Readonly<Props>) {
  const { activeTab, tabGroups } = useTabs();
  const { colors } = useColors();
  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    navigate(tab.path);
  };

  return (
    <Wrapper style={{ width: isOpen ? "240px" : "90px" }}>
      <Container style={{ width: isOpen ? "240px" : "90px" }}>
        <Header>
          <MainLogo size={40} color="blue" />
          {isOpen ? "서울대학교 야구부" : ""}
        </Header>
        <Content>
          {tabGroups.map((group) => (
            <div key={group.title}>
              <TabGroupTitle $isOpen={isOpen}>{group.title}</TabGroupTitle>
              {group.tabs.map((tab) => (
                <TabItem
                  key={tab.title}
                  onClick={() => handleTabClick(tab)}
                  $isActive={activeTab === tab}
                  $isOpen={isOpen}
                  data-testid={tab.title}
                >
                  <AppIcon
                    icon={tab.icon}
                    size={20}
                    color={activeTab === tab ? colors.primary : colors.text500}
                  />
                  {isOpen && tab.title}
                </TabItem>
              ))}
            </div>
          ))}
        </Content>
      </Container>
      <ToggleIcon
        onClick={toggleSidebar}
        $left={isOpen ? "225px" : "75px"}
        data-testid="toggle-sidebar"
      >
        <AppIcon
          icon={isOpen ? "chevron-left" : "chevron-right"}
          size={24}
          color={colors.text500}
        />
      </ToggleIcon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: block;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background300};
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;

  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0 16px 16px 0;
  transition: width 0.3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  gap: 0.5rem;

  position: sticky;
  top: 0;
  z-index: 10;

  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: "SCDream";
  font-size: 1.1rem;
  font-weight: 900;

  background-color: ${({ theme }) => theme.colors.background300};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray300};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
`;

const TabGroupTitle = styled.div<{ $isOpen: boolean }>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.text700 : "transparent"};
  font-size: 1rem;
  font-weight: 600;
  padding: 4px 16px;
`;

const TabItem = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOpen ? "flex-start" : "center")};
  gap: 8px;
  margin: 4px 0;
  padding: 8px 24px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.text500};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background500 : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background500};
  }
`;

const ToggleIcon = styled.div<{ $left: string }>`
  position: fixed;
  top: 14px;
  left: ${(props) => props.$left};
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background300};
  box-shadow: 2px 0 1px rgba(0, 0, 0, 0.25);
  padding: 5px 0 0 0;
  border-radius: 8px;
  z-index: 11;
`;
