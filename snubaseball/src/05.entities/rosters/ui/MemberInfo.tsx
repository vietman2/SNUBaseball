"use client";

import styled from "styled-components";
import { RosterMemberDetailsType } from "../models/roster";
import { useColors } from "@shared/lib/styles";

interface Props {
  member: RosterMemberDetailsType;
}

export function MemberInfo({ member }: Readonly<Props>) {
  const { colors } = useColors();

  const isPlayer = (player: RosterMemberDetailsType): boolean => {
    // 3가지 중 하나라도 해당하면 선수로 간주
    const playerRoles = ["주장", "부주장", "선수"];

    return playerRoles.includes(player.role);
  };

  return (
    <Grid>
      <MemberInfoItem
        label="등번호"
        value={member.back_number || "-"}
        color={colors.primary}
      />
      <MemberInfoItem
        label="입학년도"
        value={`${member.member.admission_year}년`}
      />
      <MemberInfoItem label="전공" value={member.member.major || "-"} />
      <MemberInfoItem
        label="생년월일"
        value={member.member.birth_date || "-"}
      />
      {isPlayer(member) && (
        <>
          <MemberInfoItem label="포지션" value={member.position || "-"} />
          <MemberInfoItem label="투타" value={member.hands || "-"} />
          <MemberInfoItem
            label="신장"
            value={member.height ? `${member.height} cm` : "-"}
          />
          <MemberInfoItem
            label="체중"
            value={member.weight ? `${member.weight} kg` : "-"}
          />
        </>
      )}
      <MemberInfoItem label="포부" value={member.goal || "-"} />
    </Grid>
  );
}

interface ItemProps {
  label: string;
  value: string | number;
  color?: string;
}

function MemberInfoItem({ label, value, color }: Readonly<ItemProps>) {
  return (
    <ItemContainer>
      <Label>{label}</Label>
      <Value style={{ color }}>{value}</Value>
    </ItemContainer>
  );
}

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 320px;
  gap: 8px;
`;

const Label = styled.span`
  flex: 1;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.span`
  flex: 3;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
