import styled from "styled-components";

import type { UserProfileType } from "../models/user";

interface Props {
  user: UserProfileType;
  size?: number;
}

export function UserAvatar({ user, size = 36 }: Readonly<Props>) {
  return (
    <Avatar
      src={
        user.profile_image ??
        "https://cdn.snubaseball.co.kr/images/default_profile.png"
      }
      alt={user.name}
      size={size}
    />
  );
}

const Avatar = styled.img<{ size: number }>`
  padding: 2px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray200};
`;
