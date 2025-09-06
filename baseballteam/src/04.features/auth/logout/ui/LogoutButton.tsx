import styled from "styled-components";

import { logout } from "../api/logout";
import { useTokens } from "@shared/lib/auth";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

export function LogoutButton() {
  const { colors } = useColors();
  const { clearToken } = useTokens();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();

      clearToken();
      window.alert("Successfully logged out.");
    }
  };

  return (
    <Button onClick={handleLogout} data-testid="logout-button">
      <span>
        <AppIcon icon="logout" size={16} color={colors.error} />
      </span>
      <span>로그아웃</span>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  width: 100%;

  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.error};

  border-radius: 8px;

  > span:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray400};
    cursor: pointer;
  }
`;
