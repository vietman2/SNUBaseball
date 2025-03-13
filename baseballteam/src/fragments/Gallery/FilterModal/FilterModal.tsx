import { useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useGallery } from "@contexts/gallery";
import { MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";

interface Props {
  selectedTag: MediaTagType | null;
  selectedMember: MemberMiniType | null;
  setSelectedTag: (tag: MediaTagType | null) => void;
  setSelectedMember: (person: MemberMiniType | null) => void;
  toggleModal: () => void;
}

export function FilterModal({
  selectedTag,
  selectedMember,
  setSelectedTag,
  setSelectedMember,
  toggleModal,
}: Readonly<Props>) {
  const [mode, setMode] = useState<"tag" | "person">("tag");
  const [tempTag, setTempTag] = useState<MediaTagType | null>(selectedTag);
  const [tempPerson, setTempPerson] = useState<MemberMiniType | null>(
    selectedMember
  );

  const { people, allTags, memberQuery, setMemberQuery } = useGallery();

  const toggleMode = (mode: "tag" | "person") => {
    setMode(mode);
  };

  const handleReset = () => {
    setTempTag(null);
    setTempPerson(null);
  };

  const handleApply = () => {
    setSelectedTag(tempTag);
    setSelectedMember(tempPerson);
    toggleModal();
  };

  const handleTagClick = (tag: MediaTagType) => {
    if (tempTag?.id === tag.id) {
      setTempTag(null);
    } else {
      setTempTag(tag);
    }
  };

  const handlePersonClick = (person: MemberMiniType) => {
    if (tempPerson?.id === person.id) {
      setTempPerson(null);
    } else {
      setTempPerson(person);
    }
  };

  return (
    <Overlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <span>필터</span>
        <Header>
          <Chip
            onClick={() => toggleMode("tag")}
            $active={mode === "tag"}
            data-testid="tag-mode"
          >
            <AppIcon icon="tag" size={16} color="#0F0F70" />
            <span>{tempTag ? tempTag.name : "전체"}</span>
          </Chip>
          <Chip
            onClick={() => toggleMode("person")}
            $active={mode === "person"}
            data-testid="person-mode"
          >
            <AppIcon icon="people" size={16} color="#0F0F70" />
            <span>
              {tempPerson
                ? `${tempPerson.admission_year} ${tempPerson.full_name}`
                : "전체"}
            </span>
          </Chip>
        </Header>
        {mode === "tag" ? (
          <List>
            {allTags.map((tag) => (
              <Chip
                key={tag.id}
                $active={tempTag?.id === tag.id}
                onClick={() => handleTagClick(tag)}
                data-testid={`tag-${tag.id}`}
              >
                {tag.name}{" "}
                {tempTag?.id === tag.id && (
                  <AppIcon icon="check" size={16} color="#0F0F70" />
                )}
              </Chip>
            ))}
          </List>
        ) : (
          <>
            <input
              type="text"
              placeholder="학번이나 이름으로 검색"
              value={memberQuery}
              onChange={(e) => setMemberQuery(e.target.value)}
              data-testid="search-input"
            />
            <List>
              {people.map((person) => (
                <Chip
                  key={person.id}
                  $active={tempPerson?.id === person.id}
                  onClick={() => handlePersonClick(person)}
                  data-testid={`person-${person.id}`}
                >
                  {person.admission_year} {person.full_name}{" "}
                  {tempPerson?.id === person.id && (
                    <AppIcon icon="check" size={16} color="#0F0F70" />
                  )}
                </Chip>
              ))}
            </List>
          </>
        )}
        <ButtonsWrapper>
          <button onClick={handleReset} data-testid="reset">
            초기화
          </button>
          <button onClick={toggleModal} data-testid="cancel">
            취소
          </button>
          <button onClick={handleApply} data-testid="apply">
            적용
          </button>
        </ButtonsWrapper>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
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
  flex-direction: column;
  width: 25vw;
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
  cursor: default;

  > span {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }

  > input {
    display: block;
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Chip = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;

  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground700};

  border-radius: 8px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.background100 : theme.colors.background500};

  cursor: pointer;
  transition: background-color 0.6s;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;

    font-size: 0.825rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground700};

    background-color: ${({ theme }) => theme.colors.background500};
    border-radius: 8px;
  }

  > button:first-child {
    color: #ff4040;
    background-color: ${({ theme }) => theme.colors.background300};
  }

  > button:last-child {
    color: ${({ theme }) => theme.colors.background100};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
