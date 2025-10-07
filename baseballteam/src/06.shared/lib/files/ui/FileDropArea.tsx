import { useRef, useState } from "react";
import styled from "styled-components";

import { useFileSelect } from "../contexts/useFileSelect";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  accept?: string;
}

export function FileDropArea({ accept = "image/*,video/*" }: Readonly<Props>) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addFiles } = useFileSelect();
  const { colors } = useColors();

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    addFiles(e.target.files);
    // 같은 파일 다시 선택 가능하도록 value 초기화
    e.currentTarget.value = "";
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <Container>
      <Label>
        <AppIcon icon="upload" size={16} color={colors.primary} />
        <span>파일 업로드</span>
      </Label>
      <DropArea
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        $active={dragActive}
        data-testid="drag-area"
      >
        <button
          onClick={() => inputRef.current?.click()}
          data-testid="file-select-button"
        >
          마우스로 파일을 끌어오거나 여기를 클릭하세요
          <Hint>파일을 여러 개 선택할 수 있어요</Hint>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={onChangeInput}
          hidden
          data-testid="file-input"
        />
      </DropArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  margin-left: 4px;
  gap: 8px;

  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const DropArea = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  position: relative;

  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;

  border: 2px dashed
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.divider};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  transition: border-color 0.15s ease, background-color 0.15s ease,
    opacity 0.15s ease;

  opacity: ${({ $active }) => ($active ? 0.8 : 1)};

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    gap: 8px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const Hint = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.warning};
`;
