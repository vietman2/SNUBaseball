import styled from "styled-components";

import type { MemberDetailsType } from "../models/member";
import { formatPhoneKR } from "@shared/lib/formatters";
import { Skeleton } from "@shared/ui/Loading";

export function MemberTableHeaderRow() {
  return (
    <HeaderRow>
      <div className="narrow-row">No.</div>
      <div>구분</div>
      <div className="extra-wide-row">이름 (학번)</div>
      <div className="wide-row">학번</div>
      <div className="wide-row">전공</div>
      <div className="wide-row">전화번호</div>
      <div>생년월일</div>
      <div>입부일</div>
      <div>상태</div>
    </HeaderRow>
  );
}

export function MemberTableRowSkeleton() {
  return (
    <Row>
      <Skeleton width="100%" height="40px" borderRadius="8px" />
    </Row>
  );
}

interface Props {
  index: number;
  member: MemberDetailsType;
}

export function MemberTableRow({ index, member }: Readonly<Props>) {
  return (
    <Row>
      <div className="narrow-row">{index + 1}</div>
      <div>{member.role}</div>
      <div className="extra-wide-row">
        {member.name} ({member.admission_year})
      </div>
      <div className="wide-row">{member.student_id || "-"}</div>
      <div className="wide-row">{member.major.name}</div>
      <div className="wide-row">
        {member.phone ? formatPhoneKR(member.phone) : "-"}
      </div>
      <div>{member.birth_date || "-"}</div>
      <div>{member.date_joined || "-"}</div>
      <div>{member.status}</div>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 32px;
  max-height: 32px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    width: 100px;
    min-height: 32px;
    max-height: 32px;

    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-right: ${({ theme }) => `1px solid ${theme.colors.gray400}`};
  }

  .extra-wide-row {
    width: 240px;
  }

  .wide-row {
    width: 160px;
  }

  .narrow-row {
    width: 60px;
  }

  > div:last-child {
    border-right: none;
  }
`;

const HeaderRow = styled(Row)`
  > div {
    font-size: 1rem;
    font-weight: 600;
  }
`;
