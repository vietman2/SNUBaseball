import styled from "styled-components";

import { useGallery } from "../contexts/useGallery";
import { useMediaSelects } from "../contexts/useMediaSelects";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { MultiSelectMenu, SingleSelectMenu } from "@shared/ui/Selects";

export function AlbumSelect() {
  const { selectedAlbum, setSelectedAlbum } = useMediaSelects();
  const { albums } = useGallery();
  const { colors } = useColors();

  return (
    <Container>
      <Label>
        <AppIcon icon="album" color={colors.primary} size={16} /> 앨범 선택
      </Label>
      <SingleSelectMenu
        options={albums}
        value={selectedAlbum}
        onSelect={setSelectedAlbum}
        getLabel={(album) => album.title}
      />
    </Container>
  );
}

export function TagsSelect() {
  const { selectedTags, selectTag } = useMediaSelects();
  const { tags } = useGallery();
  const { colors } = useColors();

  return (
    <Container>
      <Label>
        <AppIcon icon="tag" color={colors.primary} size={16} /> 태그 선택
      </Label>
      <MultiSelectMenu
        options={tags}
        value={selectedTags}
        onSelect={selectTag}
        getLabel={(tag) => `# ${tag.name}`}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 8px;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
