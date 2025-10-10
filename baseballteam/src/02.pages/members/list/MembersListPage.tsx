import styled from "styled-components";

import { SimpleModal, useSimpleModal } from "@widgets/modal";
import {
  AddNewMemberButton,
  AddNewMemberTableButton,
  NewMemberForm,
} from "@features/members/addNewMember";
import { MajorSelectsProvider } from "@entities/majors";
import {
  ContactInputsProvider,
  DateInputsProvider,
  NameIDInputProvider,
  MemberTableHeaderRow,
  MemberTableRow,
  MemberTableRowSkeleton,
  useMembers,
} from "@entities/members";
import { PageTitle } from "@shared/ui/Texts";

export function MembersListPage() {
  const { isOpen, open, close } = useSimpleModal();

  return (
    <>
      <Container>
        <PageTitle>부원 목록</PageTitle>
        <Header>
          <div />
          <AddNewMemberButton openForm={open} />
        </Header>
        <MemberTableHeaderRow />
        <List openForm={open} />
      </Container>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <MajorSelectsProvider originalMajor={null}>
          <ContactInputsProvider
            originalPhone=""
            originalEmail=""
            originalAddress=""
          >
            <DateInputsProvider
              originalBirthDate={null}
              originalJoinDate={null}
            >
              <NameIDInputProvider>
                <NewMemberForm closeForm={close} />
              </NameIDInputProvider>
            </DateInputsProvider>
          </ContactInputsProvider>
        </MajorSelectsProvider>
      </SimpleModal>
    </>
  );
}

interface Props {
  openForm: () => void;
}

function List({ openForm }: Readonly<Props>) {
  const { data: members, isLoading, error } = useMembers();

  if (isLoading) {
    return (
      <ListContainer style={{ gap: 8 }}>
        <MemberTableRowSkeleton />
        <MemberTableRowSkeleton />
        <MemberTableRowSkeleton />
        <MemberTableRowSkeleton />
      </ListContainer>
    );
  }

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <ListContainer>
      {members?.map((member, index) => (
        <MemberTableRow key={member.id} index={index} member={member} />
      ))}
      <AddNewMemberTableButton openForm={openForm} />
    </ListContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;

  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  padding-right: 36px;
`;

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > div {
    border-top: 0.5px solid ${({ theme }) => theme.colors.gray400};
  }

  > div:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  > div:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;
