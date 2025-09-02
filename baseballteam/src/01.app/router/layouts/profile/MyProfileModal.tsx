import { Outlet } from "react-router";
import styled from "styled-components";

import { LogoutButton } from "@features/auth/logout";

export function MyProfileModal() {
  return (
    <Container>
      <Left>
        <h2 className="profile-modal-title">내 프로필</h2>
        <div className="profile-modal-sidebar"></div>
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
  min-height: 50vh;
  max-height: 80vh;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 12px;

  > h2.profile-modal-title {
    margin: 0;
    font-size: 1.25rem;
  }

  .profile-modal-sidebar {
    flex: 1;
  }
`;

const Right = styled.div`
  flex: 4;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPaper};
  border-radius: 12px;
  // shadow to left
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
`;
