import { AlbumBadge } from "./AlbumBadge";
import type { AlbumType } from "../models/album";
import { AppIcon } from "@shared/ui/Icons";
import { MenuContainer, useMenu } from "@shared/ui/Menus";
import { SelectMenu } from "@shared/ui/Selects";

interface Props {
  albums: AlbumType[];
  selectedAlbum: AlbumType | null;
  selectAlbum: (album: AlbumType | null) => void;
}

export function AlbumSelect({ albums, selectedAlbum, selectAlbum }: Readonly<Props>) {
  const { ref, isOpen, open, close } = useMenu();

  const onSelect = (album: AlbumType) => {
    selectAlbum(album);
    close();
  };

  const removeSelected = () => {
    selectAlbum(null);
    close();
  };

  return (
    <SelectMenu.Container ref={ref}>
      <SelectMenu.ItemsContainer
        onClick={open}
        as="button"
        type="button"
        data-testid="open-album-dropdown"
      >
        {selectedAlbum === null ? (
          <SelectMenu.Placeholder onClick={open} data-testid="open-album-select">
            선택하기
          </SelectMenu.Placeholder>
        ) : (
          <AlbumBadge album={selectedAlbum} />
        )}
      </SelectMenu.ItemsContainer>
      <MenuContainer $isOpen={isOpen}>
        <SelectMenu.SelectedArea>
          {selectedAlbum === null ? (
            <SelectMenu.Placeholder>선택하기</SelectMenu.Placeholder>
          ) : (
            <button onClick={removeSelected} data-testid="remove-selected">
              <AlbumBadge album={selectedAlbum} />
              <AppIcon icon="close" size={12} color={selectedAlbum.color} />
            </button>
          )}
        </SelectMenu.SelectedArea>
        <SelectMenu.Options>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => onSelect(album)}
              data-testid={`select-${album.title}`}
            >
              <AlbumBadge album={album} />
            </button>
          ))}
        </SelectMenu.Options>
      </MenuContainer>
    </SelectMenu.Container>
  );
}
