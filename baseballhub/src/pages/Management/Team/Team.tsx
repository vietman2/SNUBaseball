import { useEffect, useState } from "react";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { MobileModal, SimpleModal } from "@components/Modals";
import { Subtitle } from "@components/Texts";
import { useAuth } from "@contexts/auth";
import {
  MemberDetail,
  MemberSimple,
  MemberSimpleHeader,
} from "@fragments/Member";
import { useWindowSize } from "@hooks/useWindowSize";
import { MemberType } from "@models/user";
import { getMembers } from "@services/person";

export function Team() {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { width } = useWindowSize();
  const { user } = useAuth();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMemberId(null);
    handleRefresh();
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleMemberClick = (member: MemberType) => {
    setSelectedMemberId(member.id);
    openModal();
  };

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);

      const response = await getMembers("ybs");

      if (response) {
        setMembers(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchMembers();
  }, [refreshCount]);

  if (error) {
    return (
      <Container>
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Subtitle size="large">야구부원 목록</Subtitle>
        {user?.is_admin && <Button onClick={() => {}}>신입부원 추가</Button>}
      </Header>
      <Table>
        <MemberSimpleHeader wide={width > 768} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMemberClick(member)}
                data-testid={`member-${member.id}`}
              >
                <MemberSimple
                  key={member.id}
                  member={member}
                  wide={width > 768}
                />
              </button>
            ))}
          </>
        )}
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
  padding: 16px;
  gap: 12px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-weight: 500;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
