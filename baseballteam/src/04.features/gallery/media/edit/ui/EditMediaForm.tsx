import styled from "styled-components";

import { useEditForm } from "../hooks/useEditForm";
import { AlbumSelect } from "@entities/gallery/album";
import type { MediaType } from "@entities/gallery/media";
import { TagsSelect } from "@entities/gallery/tags";
import { useColors } from "@shared/lib/styles";
import { SubmitButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  media: MediaType;
  closeMedia: () => void;
}

export function EditMediaForm({ media, closeMedia }: Readonly<Props>) {
  const {
    albums,
    tags,
    selectedAlbum,
    selectAlbum,
    selectedTags,
    selectTag,
    submit,
    isButtonDisabled,
  } = useEditForm({ media, closeMedia });
  const { colors } = useColors();

  return (
    <Container data-testid="edit-media-form">
      <h3>미디어 수정</h3>
      <Selects>
        <SelectWrapper>
          <SelectLabel>
            <AppIcon icon="album" color={colors.primary} size={16} /> 앨범 선택
          </SelectLabel>
          <AlbumSelect
            albums={albums}
            selectedAlbum={selectedAlbum}
            selectAlbum={selectAlbum}
          />
        </SelectWrapper>
        <SelectWrapper>
          <SelectLabel>
            <AppIcon icon="tag" color={colors.primary} size={16} /> 태그 선택
          </SelectLabel>
          <TagsSelect
            tags={tags}
            selectedTags={selectedTags}
            selectTag={selectTag}
          />
        </SelectWrapper>
      </Selects>
      <MediaSummary>
        <span>
          <AppIcon icon="file" color={colors.primary} size={16} />
          {media.filename}
        </span>
        <span>{media.uploaded_by.name}</span>
      </MediaSummary>
      <SubmitButton
        onClick={submit}
        disabled={isButtonDisabled}
        data-testid="submit-edit"
      >
        저장
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Selects = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  > div:first-child {
    flex: 1;
  }

  > div:last-child {
    flex: 2;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SelectLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 8px;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MediaSummary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.textPrimary};

  background-color: ${({ theme }) => theme.colors.textPrimary}40;
  border-radius: 4px;

  > span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
