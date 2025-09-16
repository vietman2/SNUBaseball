import { Link, Outlet, useLocation } from "react-router";
import styled from "styled-components";

import { ModalSidebarItem } from "@widgets/sidebar/ModalSidebar";
import { LogoutButton } from "@features/auth/logout";
import { useRouter } from "@shared/lib/router";
import { Divider } from "@shared/ui/Dividers";

const innerTabs = [
  { label: "계정", href: "account", icon: "person" },
  { label: "정보", href: "info", icon: "player" },
  //{ label: "비밀번호 변경", href: "change-password", icon: "lock" },
];

export function ProfileLayout() {
  const { pathname } = useLocation();
  const { backgroundLocation } = useRouter();

  return (
    <Container>
      <Left>
        <h2 className="profile-modal-title">내 프로필</h2>
        <div className="profile-modal-sidebar">
          {innerTabs.map((tab) => (
            <Link to={tab.href} key={tab.href} state={{ backgroundLocation }}>
              <ModalSidebarItem
                icon={tab.icon}
                label={tab.label}
                isActive={pathname.endsWith(tab.href)}
              />
            </Link>
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

const Right = styled.div`
  flex: 3;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border-radius: 12px;
  // shadow to left
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
`;
