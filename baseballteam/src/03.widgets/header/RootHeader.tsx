import { Link } from "react-router";
import styled from "styled-components";

import { UserAvatar, type UserProfileType } from "@entities/user";
import { useRouter } from "@shared/lib/router";
import { useColors } from "@shared/lib/styles";
import { Logo } from "@shared/ui/Icons";

interface Props {
  user: UserProfileType;
}

export function RootHeader({ user }: Readonly<Props>) {
  const { isDarkMode } = useColors();
  const { backgroundLocation } = useRouter();

  return (
    <Container>
      <Link to="/">
        <Logo size={36} type={isDarkMode ? "SILVER" : "BLUE"} horizontal />
      </Link>
      <Button
        to="/my/account"
        state={{ backgroundLocation }}
        data-testid="user-button"
      >
        <span className="header-user-avatar">
          <UserAvatar user={user} />
        </span>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  max-height: 60px;
  padding: 8px 24px;

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border-bottom: 0.25px solid ${({ theme }) => theme.colors.divider};
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 8px;

  .header-user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;
