import styled from "styled-components";

import type { UserProfileType } from "../models/user";

interface Props {
  user: UserProfileType;
  size?: number;
}

export function UserAvatar({ user, size = 32 }: Readonly<Props>) {
  return (
    <Avatar
      src={
        user.member.profile_image
          ? user.member.profile_image.url
          : "https://cdn.snubaseball.co.kr/images/default_profile.png"
      }
      alt={user.member.name}
      size={size}
    />
  );
}

const Avatar = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  object-fit: cover;
`;
