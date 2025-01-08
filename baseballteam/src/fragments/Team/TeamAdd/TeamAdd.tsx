import { useEffect, useState } from "react";
import styled from "styled-components";

import { MemberMiniType } from "@models/user";
import { createTeamMember, getMemberOptions } from "@services/team";

interface Props {
  year: string | undefined;
  handleClose: () => void;
}

export function TeamMemberAddModal({ year, handleClose }: Readonly<Props>) {
  const [memberOptions, setMemberOptions] = useState<MemberMiniType[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number>();
  const [backNumber, setBackNumber] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<string>("선수");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleSubmit = async () => {
    const response = await createTeamMember(
      year,
      selectedMemberId,
      backNumber,
      selectedRole,
      isRegistered
    );

    if (response) {
      handleClose();
    } else {
      window.alert("팀원 추가에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await getMemberOptions(year);

      if (response) {
        setMemberOptions(response);
      }
    };

    fetchOptions();
  }, [year]);

  if (!year) return null;

  return (
    <Overlay onClick={handleClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>{year} 서울대 팀원 추가</Title>
        <Contents>
          <Wrapper>
            <span>부원</span>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(Number(e.target.value))}
              data-testid="member-select"
            >
              <option value={undefined}>선택</option>
              {memberOptions.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.full_name} ({member.admission_year})
                </option>
              ))}
            </select>
          </Wrapper>
          <Wrapper>
            <span>배번</span>
            <input
              type="number"
              value={backNumber}
              onChange={(e) => setBackNumber(Number(e.target.value))}
              data-testid="back-number-input"
            />
          </Wrapper>
          <Wrapper>
            <span>구분</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              data-testid="role-select"
            >
              <option value="선수">선수</option>
              <option value="매니저">매니저</option>
              <option value="지도자">지도자</option>
              <option value="주장">주장</option>
              <option value="부주장">부주장</option>
              <option value="수석매니저">수석매니저</option>
            </select>
          </Wrapper>
          <Wrapper>
            <span>선수등록 여부</span>
            <input
              type="checkbox"
              checked={isRegistered}
              onChange={() => setIsRegistered(!isRegistered)}
              data-testid="registered-checkbox"
            />
          </Wrapper>
        </Contents>
        <Button onClick={handleSubmit}>추가</Button>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 30%;
  transform: translate(-25%, -50%);
  padding: 16px;
  gap: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > span:first-child {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    transform: translate(-50%, -50%);
  }
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > select {
    align-items: center;
    height: 26px;
    width: 100px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background: url("/assets/icons/chevron-down.svg") no-repeat 96% 48%;
    background-color: ${({ theme }) => theme.colors.background300};

    @media (max-width: 768px) {
      width: 40vw;
    }
  }

  > input[type="number"] {
    height: 26px;
    width: 100px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background300};

    @media (max-width: 768px) {
      width: 40vw;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.background100};
  background-color: ${({ theme }) => theme.colors.primary};
`;
