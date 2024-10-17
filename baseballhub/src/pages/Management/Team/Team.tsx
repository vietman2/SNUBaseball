import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { MobileModal, SimpleModal } from "@components/Modals";
import { useAuth } from "@contexts/auth";
import { sampleMembers } from "@data/user";
import {
  MemberDetail,
  MemberSimple,
  MemberSimpleHeader,
} from "@fragments/Member";
import { useWindowSize } from "@hooks/useWindowSize";
import { MemberType } from "@models/user";

export function Team() {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width } = useWindowSize();
  const { user } = useAuth();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMemberClick = (member: MemberType) => {
    setSelectedMemberId(member.id);
    openModal();
  };

  useEffect(() => {
    setMembers(sampleMembers);
  }, []);

  return (
    <Container>
      <FilterWrapper>
        {user?.is_admin && (
          <button onClick={() => {}}>
            <Chip label="신입부원 추가" />
          </button>
        )}
      </FilterWrapper>
      <Table>
        <MemberSimpleHeader wide={width > 768} />
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => handleMemberClick(member)}
            data-testid={`member-${member.id}`}
          >
            <MemberSimple key={member.id} member={member} wide={width > 768} />
          </button>
        ))}
      </Table>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <MemberDetail memberId={selectedMemberId} goBack={closeModal} />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <MemberDetail memberId={selectedMemberId} goBack={closeModal} />
        </MobileModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
