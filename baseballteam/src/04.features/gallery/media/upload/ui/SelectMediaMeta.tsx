import styled from "styled-components";

import { useUploadMediaForm } from "../contexts/useUploadMediaForm";
import { AlbumSelect, useAlbums } from "@entities/gallery/album";
import { TagsSelect, useTags } from "@entities/gallery/tags";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

export function SelectMediaMeta() {
  const { albums } = useAlbums();
  const { tags } = useTags();
  const { selectedAlbum, selectAlbum, selectedTags, selectTag } =
    useUploadMediaForm();
  const { colors } = useColors();

  return (
    <Header>
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
    </Header>
  );
}
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;

  > div:first-child {
    flex: 1;
  }

  > div:last-child {
    flex: 2; // 태그 선택이 앨범 선택보다 두 배 넓게
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
