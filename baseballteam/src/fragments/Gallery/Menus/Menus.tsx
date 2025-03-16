import { useEffect, useRef } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";

interface AlbumProps {
  toggleMenu: () => void;
  albums: AlbumType[];
  selectedAlbum: AlbumType | null;
  handleSelect: (album: AlbumType | null) => void;
}

export function AlbumMenu({
  toggleMenu,
  albums,
  selectedAlbum,
  handleSelect,
}: Readonly<AlbumProps>) {
  return (
    <Menu toggleMenu={toggleMenu}>
      <div>
        <span>앨범 선택</span>
        <Divider color="#A1A1A1" />
        <List>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => handleSelect(album)}
              data-testid={`album-${album.id}`}
            >
              {album.title}
              {selectedAlbum?.id === album.id && (
                <AppIcon icon="check" size={16} color="#0F0F70" />
              )}
            </button>
          ))}
        </List>
      </div>
    </Menu>
  );
}

interface TagProps {
  toggleMenu: () => void;
  allTags: MediaTagType[];
  selectedTags: MediaTagType[];
  selectTag: (tag: MediaTagType) => void;
}

export function TagMenu({
  toggleMenu,
  allTags,
  selectedTags,
  selectTag,
}: Readonly<TagProps>) {
  return (
    <Menu toggleMenu={toggleMenu}>
      <div>
        <span>태그 선택</span>
        <Divider color="#A1A1A1" />
        <List>
          {allTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => selectTag(tag)}
              data-testid={`tag-${tag.id}`}
            >
              {tag.name}
              {selectedTags.map((t) => t.id).includes(tag.id) && (
                <AppIcon icon="check" size={16} color="#0F0F70" />
              )}
            </button>
          ))}
        </List>
      </div>
    </Menu>
  );
}

interface PersonProps {
  toggleMenu: () => void;
  people: MemberMiniType[];
  selectedPeople: MemberMiniType[];
  selectPerson: (person: MemberMiniType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function PersonMenu({
  toggleMenu,
  people,
  selectedPeople,
  selectPerson,
  searchQuery,
  setSearchQuery,
}: Readonly<PersonProps>) {
  return (
    <Menu toggleMenu={toggleMenu}>
      <div>
        <span>인물 선택</span>
        <Divider color="#A1A1A1" />
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="학번이나 이름으로 검색"
          data-testid="search-input"
        />
        <List>
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => selectPerson(person)}
              data-testid={`member-${person.id}`}
            >
              {person.admission_year} {person.full_name}
              {selectedPeople.map((p) => p.id).includes(person.id) && (
                <AppIcon icon="check" size={16} color="#0F0F70" />
              )}
            </button>
          ))}
        </List>
        <SelectedList>
          {selectedPeople.map((person) => (
            <button
              key={person.id}
              onClick={() => selectPerson(person)}
              data-testid="selected-person"
            >
              {person.admission_year} {person.full_name}
              <AppIcon icon="close" size={16} color="red" />
            </button>
          ))}
        </SelectedList>
      </div>
    </Menu>
  );
}

interface MenuProps {
  toggleMenu: () => void;
  children: React.ReactNode;
}

function Menu({ toggleMenu, children }: Readonly<MenuProps>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to check if a click is outside the element
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, toggleMenu]);

  return (
    <MenuContainer ref={wrapperRef} data-testid="wrapper">
      {children}
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  display: block;
  width: 100%;
  min-width: 240px;
  max-width: 320px;
  max-height: 360px;
  position: absolute;
  top: 24px;
  right: auto;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.background700};
  border-radius: 16px;
  z-index: 10001;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    > span {
      display: flex;
      padding: 12px 16px 8px 16px;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground500};
    }
  }

  input {
    display: block;
    padding: 6px 16px;
    margin: 8px;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 16px;
    font-size: 0.875rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > button:last-child {
    border-bottom: none;
  }
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 8px 16px;
  gap: 8px;

  > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0;
    padding: 6px 8px;
    font-size: 0.875rem;
    background-color: ${({ theme }) => theme.colors.background500};
    border-radius: 8px;
    white-space: nowrap;
  }
`;
