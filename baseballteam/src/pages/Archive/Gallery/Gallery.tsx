import { useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useTheme } from "@contexts/theme";
import { uploadFiles } from "@services/archive";

export function Gallery() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const { colors } = useTheme();

  const toggleModal = () => {
    if (modalVisible) {
      setFiles([]);
    }

    setModalVisible((prev) => !prev);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setFiles((prev) => [...prev, ...newFiles]);
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const droppedFiles = event.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
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

  const handleSubmit = async () => {
    const response = await uploadFiles(files, (progress) => {
      setProgress(progress);
    });

    if (response) {
      setFiles([]);
      setProgress(0);
      toggleModal();
    } else {
      alert("업로드에 실패했습니다.");
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Gallery</Title>
          <Button onClick={toggleModal} data-testid="open-modal">
            업로드
          </Button>
        </Header>
        <Contents>
          <Filters>
            <span>앨범</span>
            <span>태그</span>
            <span>사람</span>
          </Filters>
          <Board>Board</Board>
        </Contents>
      </Container>
      <Overlay $visible={modalVisible} onClick={toggleModal}>
        <Modal>
          <div onClick={(e) => e.stopPropagation()}>
            <span>업로드</span>
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
                onChange={(e) => handleFiles(e.target.files)}
                data-testid="file-input"
              />
              {files.map((file) => (
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
            <button onClick={handleSubmit}>전송 시작</button>
          </div>
        </Modal>
      </Overlay>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Button = styled.button`
  padding: 4px 12px;

  color: ${({ theme }) => theme.colors.background100};
  font-size: 1rem;
  font-weight: 600;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
`;

const Filters = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  gap: 8px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background500};

  > span {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }
`;

const Board = styled.div`
  display: grid;
  flex: 5;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  overflow-y: auto;
`;

const Overlay = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
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
