import { Link, Outlet } from "react-router";
import styled from "styled-components";

import { LogoutButton } from "@features/auth/logout";
import { MyModalTabs, useRouter } from "@shared/lib/router";
import { useColors } from "@shared/lib/styles";
import { Divider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";

export function MyLayout() {
  const { colors } = useColors();
  const { backgroundLocation, displayLocation } = useRouter();

  const isActiveTab = (href: string) => {
    return displayLocation.pathname.endsWith(href);
  };

  return (
    <Container>
      <Left>
        <h2 className="profile-modal-title">내 프로필</h2>
        <div className="profile-modal-sidebar">
          {MyModalTabs.tabs.map((tab) => (
            <SidebarLink
              to={tab.href}
              key={tab.href}
              state={{ backgroundLocation }}
              className={isActiveTab(tab.href) ? "active" : ""}
            >
              <AppIcon
                icon={tab.icon}
                size={20}
                color={
                  isActiveTab(tab.href)
                    ? colors.textPrimary
                    : colors.textSecondary
                }
              />
              <span>{tab.label}</span>
            </SidebarLink>
          ))}
        </div>
        <Divider />
        <LogoutButton />
      </Left>
      <Right>
        <Outlet />
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 65vw;
  min-width: 760px;
  min-height: 75vh;
  max-height: 75vh;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 8px;

  > h2.profile-modal-title {
    margin: 0;
    font-size: 1.25rem;
  }

  .profile-modal-sidebar {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 16px;
    gap: 4px;
  }
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;

  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;

  &.active {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.backgroundPaper};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Right = styled.div`
  flex: 3;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 12px;
  // shadow to left
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
`;
