import { useEffect, useState } from "react";
import styled from "styled-components";

import { AlbumMenu, PersonMenu, TagMenu } from "./Menus";
import { useAlbum, useFiles } from "../_contexts";
import { AppIcon } from "@components/Icons";
import { useTheme } from "@contexts/theme";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";

interface Props {
  toggleModal: () => void;
}

export function UploadModal({ toggleModal }: Readonly<Props>) {
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [tags, setTags] = useState<MediaTagType[]>([]);
  const [people, setPeople] = useState<MemberMiniType[]>([]);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [albumMenuVisible, setAlbumMenuVisible] = useState<boolean>(false);
  const [tagMenuVisible, setTagMenuVisible] = useState<boolean>(false);
  const [personMenuVisible, setPersonMenuVisible] = useState<boolean>(false);

  const { uploadedFiles, progress, dropFiles, removeFile, submitFiles } =
    useFiles();
  const { selectedAlbum } = useAlbum();
  const { colors } = useTheme();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const droppedFiles = event.dataTransfer.files;
    dropFiles(droppedFiles);
  };

  const getSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    return `${size.toFixed(2)} ${units[unit]}`;
  };

  const selectAlbum = (album: AlbumType | null) => {
    setAlbum(album);
    toggleAlbumMenu();
  };

  const selectTag = (tag: MediaTagType) => {
    if (tags.includes(tag)) {
      setTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

  const selectPerson = (person: MemberMiniType) => {
    if (people.includes(person)) {
      setPeople((prev) => prev.filter((p) => p !== person));
    } else {
      setPeople((prev) => [...prev, person]);
    }
  };

  const toggleAlbumMenu = () => {
    setAlbumMenuVisible((prev) => !prev);
  };

  const toggleTagMenu = () => {
    setTagMenuVisible((prev) => !prev);
  };

  const togglePersonMenu = () => {
    setPersonMenuVisible((prev) => !prev);
  };

  const handleSubmit = async () => {
    const result = await submitFiles({
      albumId: album?.id,
      tagsId: tags.map((tag) => tag.id),
      membersId: people.map((person) => person.id),
    });
    if (result) {
      toggleModal();
    }
  };

  useEffect(() => {
    setAlbum(selectedAlbum);
  }, [selectedAlbum]);

  return (
    <Overlay onClick={toggleModal}>
      <Modal>
        <div onClick={(e) => e.stopPropagation()}>
          <span>업로드</span>
          <Options>
            <div>
              <button onClick={toggleAlbumMenu} data-testid="album-button">
                <span>{album ? album.title : "앨범 선택"}</span>
                <AppIcon
                  icon="chevron-down"
                  size={20}
                  color={colors.borderDark}
                />
              </button>
              {albumMenuVisible && (
                <AlbumMenu
                  toggleMenu={toggleAlbumMenu}
                  selectedAlbum={selectedAlbum}
                  handleSelect={selectAlbum}
                />
              )}
            </div>
            <div>
              <button onClick={toggleTagMenu} data-testid="tag-button">
                <span>
                  {tags.length > 0
                    ? `태그 ${tags.length}개 선택됨`
                    : "태그 선택"}
                </span>
                <AppIcon
                  icon="chevron-down"
                  size={20}
                  color={colors.borderDark}
                />
              </button>
              {tagMenuVisible && (
                <TagMenu
                  toggleMenu={toggleTagMenu}
                  selectedTags={tags}
                  selectTag={selectTag}
                />
              )}
            </div>
            <div>
              <button onClick={togglePersonMenu} data-testid="person-button">
                <span>
                  {people.length > 0
                    ? `인물 ${people.length}명 선택됨`
                    : "인물 선택"}
                </span>
                <AppIcon
                  icon="chevron-down"
                  size={20}
                  color={colors.borderDark}
                />
              </button>
              {personMenuVisible && (
                <PersonMenu
                  toggleMenu={togglePersonMenu}
                  selectedPeople={people}
                  selectPerson={selectPerson}
                />
              )}
            </div>
          </Options>
          <Files
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            $active={dragActive}
            data-testid="dropzone"
          >
            <label htmlFor="file">
              <AppIcon icon="plus" size={18} color={colors.primary} />
              마우스로 파일을 끌고 오거나 여기를 클릭하세요
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              id="file"
              multiple
              onChange={(e) => dropFiles(e.target.files)}
              data-testid="file-input"
            />
            {uploadedFiles.map((file) => (
              <div key={file.name}>
                <span>
                  {file.name}
                  <SizeText>{`\t(${getSize(file.size)})`}</SizeText>
                </span>
                <button
                  onClick={() => removeFile(file)}
                  data-testid="remove-file"
                >
                  <AppIcon icon="close" size={18} color="red" />
                </button>
              </div>
            ))}
          </Files>
          {progress > 0 && <span>전송중... {progress}%</span>}
          <button onClick={handleSubmit} data-testid="submit-new-media">
            전송 시작
          </button>
        </div>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    gap: 16px;

    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.background300};

    > span {
      font-size: 1.2rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};
    }

    > button {
      width: 100%;
      padding: 8px 16px;

      color: ${({ theme }) => theme.colors.background100};
      font-size: 1rem;
      font-weight: 600;

      border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px;
  gap: 16px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > div {
    position: relative;
  }

  button {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 4px;

    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground500};
  }
`;

const Files = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-height: 400px;
  padding: 16px;
  gap: 8px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  opacity: ${({ $active }) => ($active ? 0.5 : 1)};
  overflow-y: auto;

  input {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    gap: 8px;

    color: ${({ theme }) => theme.colors.primary};

    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    cursor: pointer;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.background200};

    > span {
      display: flex;
      align-items: center;
      gap: 4px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

const SizeText = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;
