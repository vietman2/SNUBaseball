import styled from "styled-components";

import { DeleteTagButton } from "@features/gallery/tags/delete";
import { TagBadge, type MediaTagType } from "@entities/gallery/tags";
import { EditButton } from "@shared/ui/Buttons";
import { useMenu } from "@shared/ui/Menus";

interface Props {
  tag: MediaTagType;
  openEditModal: () => void;
}

export function TagMenu({ tag, openEditModal }: Readonly<Props>) {
  const { ref, isOpen, open } = useMenu();

  return (
    <Container ref={ref}>
      <button onClick={open} data-testid={`tag-badge-${tag.id}`}>
        <TagBadge tag={tag} isActive />
      </button>
      {isOpen && (
        <Buttons>
          <EditButton
            onClick={openEditModal}
            label=""
            testID={`edit-button-${tag.id}`}
          />
          <DeleteTagButton tag={tag} />
        </Buttons>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  gap: 8px;

  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);

  background-color: ${({ theme }) => theme.colors.backgroundPaper};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  z-index: 2;
`;
