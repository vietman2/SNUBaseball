import styled from "styled-components";

import type { UserProfileType } from "../models/user";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  user: UserProfileType;
  size?: number;
}

export function UserAvatar({ user, size = 32 }: Readonly<Props>) {
  return (
    <Avatar
      src={
        user.member.profile_image
          ? user.member.profile_image
          : "https://cdn.snubaseball.co.kr/images/default_profile.png"
      }
      alt={user.member.name}
      size={size}
    />
  );
}

interface EditProps extends Props {
  open: () => void;
}

export function UserAvatarWithEdit({
  user,
  open,
  size = 32,
}: Readonly<EditProps>) {
  const { colors } = useColors();

  return (
    <EditAvatarButton onClick={open} data-testid="avatar-edit-button">
      <UserAvatar user={user} size={size} />
      <span>
        <AppIcon icon="pencil" size={size * 0.3} color={colors.primaryDark} />
      </span>
    </EditAvatarButton>
  );
}

const Avatar = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditAvatarButton = styled.button`
  position: relative;

  > span:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 50%;
  }
`;
