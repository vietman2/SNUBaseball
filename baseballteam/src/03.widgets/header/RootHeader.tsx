import { Link, useLocation } from "react-router";
import styled from "styled-components";

import { UserAvatar, type UserProfileType } from "@entities/user";
import { LogoHorizontal } from "@shared/ui/Icons";

interface Props {
  user: UserProfileType;
}

export function RootHeader({ user }: Readonly<Props>) {
  const location = useLocation();

  return (
    <Container>
      <Link to="/">
        <LogoHorizontal />
      </Link>
      <Button
        to="/profile/account"
        state={{ backgroundLocation: location }}
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
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
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
