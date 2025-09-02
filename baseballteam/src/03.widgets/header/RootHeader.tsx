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
        <UserAvatar user={user} />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  gap: 4px;

  border-radius: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
`;
