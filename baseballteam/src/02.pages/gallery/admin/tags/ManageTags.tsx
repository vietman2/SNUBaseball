import { useState } from "react";
import styled from "styled-components";

import { TagMenu } from "./ui/TagMenu";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import {
  TagCreateForm,
  TagEditForm,
  TagFormProvider,
} from "@features/gallery/tags/compose";
import { useTags, type MediaTagType } from "@entities/gallery/tags";

export function ManageTags() {
  const { isOpen, open, close } = useSimpleModal();
  const [activeTag, setActiveTag] = useState<MediaTagType | null>(null);
  const { tags } = useTags();

  const openCreateModal = () => {
    setActiveTag(null);
    open();
  };

  const openEditModal = (tag: MediaTagType) => {
    setActiveTag(tag);
    open();
  };

  return (
    <Container>
      <h3>태그 관리</h3>
      <Grid>
        {tags.map((tag) => (
          <TagMenu
            key={tag.id}
            tag={tag}
            openEditModal={() => openEditModal(tag)}
          />
        ))}
        <AddButton onClick={openCreateModal}>+</AddButton>
      </Grid>
      <SimpleModal isOpen={isOpen} onClose={close} minWidth={280}>
        {activeTag ? (
          <TagFormProvider initialTag={activeTag}>
            <TagEditForm tag={activeTag} close={close} />
          </TagFormProvider>
        ) : (
          <TagFormProvider>
            <TagCreateForm close={close} />
          </TagFormProvider>
        )}
      </SimpleModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;

  overflow: hidden;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  gap: 8px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 36px;

  background-color: ${({ theme }) => theme.colors.gray400};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;
