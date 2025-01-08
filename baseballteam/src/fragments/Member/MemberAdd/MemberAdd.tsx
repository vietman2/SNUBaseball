import { useState } from "react";
import styled from "styled-components";

import { createMember } from "@services/person";

interface Props {
  handleClose: () => void;
}

export function MemberAdd({ handleClose }: Readonly<Props>) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [admissionYear, setAdmissionYear] = useState<number>(2025);

  const onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionYear(Number(e.target.value));
  };

  const handleSubmit = async () => {
    const response = await createMember(firstName, lastName, admissionYear);

    if (response) {
      window.alert("부원이 성공적으로 추가되었습니다.");
      handleClose();
    } else {
      window.alert("부원 추가에 실패했습니다.");
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <AddModal onClick={(e) => e.stopPropagation()}>
        <span>부원 추가</span>
        <NameWrapper>
          <InputWrapper>
            <span>성</span>
            <input
              placeholder="성"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              data-testid="lastName"
            />
          </InputWrapper>
          <InputWrapper>
            <span>이름</span>
            <input
              placeholder="이름"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              data-testid="firstName"
            />
          </InputWrapper>
        </NameWrapper>
        <InputWrapper>
          <span>학번</span>
          <input
            type="number"
            placeholder="학번"
            value={admissionYear}
            onChange={onYearChange}
            data-testid="admissionYear"
          />
        </InputWrapper>
        <Button onClick={handleSubmit}>추가</Button>
      </AddModal>
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

const AddModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  gap: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > span:first-child {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  > input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    font-size: 0.9rem;
    outline: none;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
