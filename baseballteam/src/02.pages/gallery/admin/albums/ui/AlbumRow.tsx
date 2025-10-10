import styled from "styled-components";

import { DeleteAlbumButton } from "@features/gallery/albums/delete";
import { type AlbumType, AlbumBadge } from "@entities/gallery/album";
import { useColors } from "@shared/lib/styles";
import { EditButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

export function AlbumRowHeader() {
  const { colors } = useColors();

  return (
    <HeaderRow>
      <span className="album-narrow-column"></span>
      <span className="album-title-column">앨범 이름</span>
      <span>부원 전용</span>
      <span>
        <AppIcon icon="image" size={16} color={colors.textSecondary} />
      </span>
      <span>
        <AppIcon icon="video" size={16} color={colors.textSecondary} />
      </span>
      <span className="album-narrow-column" />
      <span className="album-narrow-column" />
    </HeaderRow>
  );
}

interface Props {
  album: AlbumType;
  openSheet: () => void;
}

export function AlbumRow({ album, openSheet }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <span className="album-narrow-column">{album.id}</span>
      <span className="album-title-column">
        <AlbumBadge album={album} />
      </span>
      <span>
        <AppIcon
          icon={album.members_only ? "lock" : "lock-open"}
          size={16}
          color={colors.textSecondary}
        />
      </span>
      <span>{album.num_images}</span>
      <span>{album.num_videos}</span>
      <span className="album-narrow-column">
        <EditButton
          onClick={openSheet}
          label=""
          testID={`edit-button-${album.id}`}
        />
      </span>
      <span className="album-narrow-column">
        <DeleteAlbumButton album={album} />
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 0 0 1;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;

  border-radius: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.2s ease-in-out;
  }

  > span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    max-width: 100px;
    gap: 8px;

    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    word-break: break-all;
  }

  .album-narrow-column {
    flex: 0 0 50px;
  }

  .album-title-column {
    flex: 0 0 300px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const HeaderRow = styled(Container)`
  margin-bottom: 4px;
  font-weight: 600;

  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};

  position: sticky;
  top: 0;
  z-index: 1;

  &:hover {
    transform: none;
    box-shadow: none;
  }
`;
