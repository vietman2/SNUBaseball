import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
  onError?: (message: string) => void;
  defaultPreviewUrl?: string | null;
  maxSizeMB?: number;
  accept?: string;
  disabled?: boolean;
}

export function SingleFileInput({
  value,
  onChange,
  onError,
  defaultPreviewUrl = null,
  maxSizeMB = 10,
  accept = "image/*",
  disabled = false,
}: Readonly<Props>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const previewUrl = useMemo(() => {
    if (value) return URL.createObjectURL(value);
    return defaultPreviewUrl ?? null;
  }, [value, defaultPreviewUrl]);

  useEffect(() => {
    return () => {
      if (value && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [value, previewUrl]);

  const validateSingle = (files: FileList | null) => {
    if (!files || files.length === 0) return null;

    if (files.length > 1) {
      onError?.("한 번에 하나의 파일만 업로드할 수 있어요.");
      return null;
    }

    const file = files[0];

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`파일 크기는 최대 ${maxSizeMB}MB까지 허용됩니다.`);
      return null;
    }

    if (accept && !RegExp(accept.replace("*", ".*")).exec(file.type)) {
      onError?.("허용되지 않는 파일 형식입니다.");
      return null;
    }
    return file;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = validateSingle(e.target.files);
    if (f) onChange(f);
  };

  const openFileDialog = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <Wrapper>
      <DropArea
        $dragOver={dragOver}
        $disabled={disabled}
        onClick={openFileDialog}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault(); // drop 허용
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragOver(false);
          const f = validateSingle(e.dataTransfer.files);
          if (f) onChange(f);
        }}
        data-testid="drop-area"
      >
        <HiddenInput
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          data-testid="file-input"
        />
        {previewUrl ? (
          <Preview src={previewUrl} alt="preview" data-testid="preview-image" />
        ) : (
          <Placeholder>클릭하거나 드래그해서 파일을 업로드</Placeholder>
        )}
      </DropArea>
      {value && !disabled && (
        <ResetButton type="button" onClick={() => onChange(null)} data-testid="reset-button">
          초기화
        </ResetButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const DropArea = styled.div<{ $dragOver: boolean; $disabled: boolean }>`
  width: 240px;
  height: 180px;
  border: 2px dashed
    ${({ theme, $dragOver }) =>
      $dragOver ? theme.colors.primary : theme.colors.gray400};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.backgroundPaper};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.backgroundPaper : theme.colors.gray100};
  }
`;

const Placeholder = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 0 12px;
`;

const Preview = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const ResetButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.backgroundPaper};
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;
