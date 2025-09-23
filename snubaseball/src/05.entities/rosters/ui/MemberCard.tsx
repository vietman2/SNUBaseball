"use client";

import Image from "next/image";
import styled from "styled-components";

import { RoleBadge } from "./RoleBadge";
import { RosterMemberType } from "../models/roster";
import { hexToRgba } from "@shared/lib/styles";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  roster_member: RosterMemberType;
}

const IMAGE_WIDTH = 160;
const IMAGE_HEIGHT = (IMAGE_WIDTH / 3) * 4;

export function MemberCard({ roster_member }: Readonly<Props>) {
  return (
    <Card>
      <Info>
        <div>
          <BackNumber>
            {roster_member.back_number}
            <RoleBadge role={roster_member.role} />
          </BackNumber>
          <Name>{roster_member.member.name}</Name>
        </div>
        <div className="member-card-moreinfo">
          {`${roster_member.member.admission_year.toString().slice(2)}학번`}
          <br />
          {roster_member.member.major}
        </div>
      </Info>
      <Image
        src={
          roster_member.member.profile_image ??
          "https://cdn.snubaseball.co.kr/profiles/default_profile.png"
        }
        alt={roster_member.member.name}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
      />
    </Card>
  );
}

export function MemberCardSkeleton() {
  return (
    <Card>
      <Info>
        <div className="member-card-profile">
          <Skeleton width={IMAGE_WIDTH * 0.6} height={24} />
        </div>
        <div className="member-card-moreinfo">
          <Skeleton width={IMAGE_WIDTH * 0.4} height={16} />
          <br />
          <Skeleton width={IMAGE_WIDTH * 0.5} height={16} />
        </div>
      </Info>
      <Skeleton width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 320px;
  height: ${IMAGE_HEIGHT}px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 2px 3px 6px
    ${({ theme }) => hexToRgba(theme.colors.focusOutline, 0.24)};
  border-radius: 8px;

  > img {
    align-self: flex-end;
    border-radius: 0 8px 8px 0;
    object-fit: contain;
  }
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  position: relative; // 대각선을 위한 기준점
  padding: 16px 0 16px 16px;
  gap: 4px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .member-card-moreinfo {
    line-height: 1.5;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const BackNumber = styled.strong`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.125rem;
  font-weight: 600;
`;

const Name = styled.strong`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.25rem;
  font-weight: 700;
`;
