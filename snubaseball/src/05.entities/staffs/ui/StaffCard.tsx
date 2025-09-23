"use client";

import Image from "next/image";
import styled from "styled-components";
import { StaffInfoType } from "../models/staff";

interface Props {
  staff: StaffInfoType;
}

export function StaffCard({ staff }: Readonly<Props>) {
  return (
    <Vertical>
      <Title>{staff.role}</Title>
      <Horizontal>
        <Image
          src="https://cdn.snubaseball.co.kr/profiles/default_profile.png"
          alt={staff.name}
          width={360}
          height={360}
        />
        <Contents>
          <Name>{staff.name}</Name>
          <p>{staff.description}</p>
        </Contents>
      </Horizontal>
    </Vertical>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  margin: 8px 0;
  padding: 0 12px;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 700;

  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  > img {
    max-width: 160px;
    height: 220px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Contents = styled(Vertical)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin: 8px 0 0 0;
    font-size: 0.95rem;
  }
`;

const Name = styled.h4`
  margin: 0;
  text-align: center;
  font-size: 1.225rem;
  font-weight: 500;
`;
