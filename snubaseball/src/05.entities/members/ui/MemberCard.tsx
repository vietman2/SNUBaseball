"use client";

import Image from "next/image";
import styled from "styled-components";

import { MemberType } from "../models/members";
import { hexToRgba } from "@shared/lib/styles";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  member: MemberType;
  isPlayer?: boolean;
}

export function MemberCard({ member, isPlayer }: Readonly<Props>) {
  const WIDTH = 180;

  return (
    <Card>
      <Image
        src={
          member.profile_image ??
          "https://cdn.snubaseball.co.kr/profiles/default_profile.png"
        }
        alt={member.name}
        width={WIDTH}
        height={WIDTH}
      />
      <Info>
        <div className="member-card-profile">
          <strong>
            {member.back_number ? `No.${member.back_number} ` : null}
            {member.name}
          </strong>
        </div>
        <div className="member-card-moreinfo">
          {isPlayer && member.type === "PLAYER"
            ? member.extras.position
            : "매니저"}
          <br />
          {member.major} {`${member.admission_year.toString().slice(2)}학번`}
        </div>
      </Info>
    </Card>
  );
}

export function MemberCardSkeleton() {
  const WIDTH = 180;

  return (
    <Card>
      <Skeleton width={WIDTH} height={WIDTH} />
      <Info>
        <div className="member-card-profile">
          <Skeleton width={WIDTH * 0.6} height={24} />
        </div>
        <div className="member-card-moreinfo">
          <Skeleton width={WIDTH * 0.4} height={16} />
          <br />
          <Skeleton width={WIDTH * 0.5} height={16} />
        </div>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 2px 3px 6px
    ${({ theme }) => hexToRgba(theme.colors.focusOutline, 0.24)};
  border-radius: 8px;

  > img {
    border-radius: 8px 8px 0 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 4px;

  .member-card-profile {
    margin-bottom: 8px;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .member-card-moreinfo {
    line-height: 1.5;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
