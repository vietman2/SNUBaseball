import { useState } from "react";
import styled from "styled-components";

import { AlbumMenu, PersonMenu, TagMenu } from "../Menus/Menus";
import { AppIcon } from "@components/Icons";
import { useGallery } from "@contexts/gallery";
import { useTheme } from "@contexts/theme";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";
import { uploadFiles } from "@services/archive";

interface Props {
  toggleModal: () => void;
}

export function UploadModal({ toggleModal }: Readonly<Props>) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<MemberMiniType[]>([]);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [albumMenuVisible, setAlbumMenuVisible] = useState<boolean>(false);
  const [tagMenuVisible, setTagMenuVisible] = useState<boolean>(false);
  const [personMenuVisible, setPersonMenuVisible] = useState<boolean>(false);

  const { albums, allTags, people, memberQuery, setMemberQuery } = useGallery();
  const { colors } = useTheme();

  const getSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    return `${size.toFixed(2)} ${units[unit]}`;
  };

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

  const dropFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const droppedFiles = event.dataTransfer.files;
    dropFiles(droppedFiles);
  };

  const handleSubmit = async () => {
    const response = await uploadFiles(
      uploadedFiles,
      (progress) => {
        setProgress(progress);
      },
      {
        albumId: selectedAlbum?.id,
        tagsId: selectedTags.map((tag) => tag.id),
        membersId: selectedPersons.map((person) => person.id),
      }
    );

    if (response) {
      setUploadedFiles([]);
      setProgress(0);
      toggleModal();
    } else {
      alert("업로드에 실패했습니다.");
      setProgress(0);
    }
  };

  const removeFile = (file: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== file));
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

  const selectAlbum = (album: AlbumType | null) => {
    setSelectedAlbum(album);
  };

  const selectTag = (tag: MediaTagType) => {
    if (selectedTags.map((t) => t.id).includes(tag.id)) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const selectPerson = (person: MemberMiniType) => {
    if (selectedPersons.map((p) => p.id).includes(person.id)) {
      setSelectedPersons((prev) => prev.filter((p) => p.id !== person.id));
    } else {
      setSelectedPersons((prev) => [...prev, person]);
    }
  };

  return (
    <Overlay onClick={toggleModal}>
      <Modal>
        <div onClick={(e) => e.stopPropagation()}>
          <span>업로드</span>
          <Options>
            <div>
              <button onClick={toggleAlbumMenu} data-testid="album-button">
                <span>{selectedAlbum ? selectedAlbum.title : "앨범 선택"}</span>
                <AppIcon
                  icon="chevron-down"
                  size={20}
                  color={colors.borderDark}
                />
              </button>
              {albumMenuVisible && (
                <AlbumMenu
                  toggleMenu={toggleAlbumMenu}
                  albums={albums}
                  selectedAlbum={selectedAlbum}
                  handleSelect={selectAlbum}
                />
              )}
            </div>
            <div>
              <button onClick={toggleTagMenu} data-testid="tag-button">
                <span>
                  {selectedTags.length > 0
                    ? `태그 ${selectedTags.length}개 선택됨`
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
                  allTags={allTags}
                  selectedTags={selectedTags}
                  selectTag={selectTag}
                />
              )}
            </div>
            <div>
              <button onClick={togglePersonMenu} data-testid="person-button">
                <span>
                  {selectedPersons.length > 0
                    ? `인물 ${selectedPersons.length}명 선택됨`
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
                  people={people}
                  selectedPeople={selectedPersons}
                  selectPerson={selectPerson}
                  searchQuery={memberQuery}
                  setSearchQuery={setMemberQuery}
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
