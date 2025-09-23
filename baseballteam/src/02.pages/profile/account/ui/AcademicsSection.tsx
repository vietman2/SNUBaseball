import styled from "styled-components";

import { Section, SectionSubtitle } from "./styles";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { UpdateMajorForm } from "@features/members/updateMajor";
import { MajorSelectsProvider, type DepartmentType } from "@entities/majors";
import { EditButton } from "@shared/ui/Buttons";

interface Props {
  memberId: number;
  major: DepartmentType;
}

export function AcademicsSection({ major, memberId }: Readonly<Props>) {
  const { isOpen, open, close } = useSimpleModal();

  return (
    <>
      <Section>
        <SectionSubtitle>전공</SectionSubtitle>
        <Label>{major.name}</Label>
        <EditButtonWrapper>
          <EditButton onClick={open} />
        </EditButtonWrapper>
      </Section>
      {isOpen && (
        <SimpleModal isOpen={isOpen} onClose={close}>
          <MajorSelectsProvider originalMajor={major}>
            <UpdateMajorForm memberId={memberId} closeModal={close} />
          </MajorSelectsProvider>
        </SimpleModal>
      )}
    </>
  );
}

const Label = styled.div`
  flex: 2;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  font-size: 1rem;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
