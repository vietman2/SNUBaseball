import styled from "styled-components";

import { useUploadMediaForm } from "../contexts/useUploadMediaForm";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { Spinner } from "@shared/ui/Loading";
import { ErrorText } from "@shared/ui/Texts";

export function SelectedFiles() {
  const { fileObjs, removeFile } = useUploadMediaForm();
  const { colors } = useColors();

  const getSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let unit = 0;
    let s = size;
    while (s >= 1024 && unit < units.length - 1) {
      s /= 1024;
      unit++;
    }
    return `${s.toFixed(2)} ${units[unit]}`;
  };

  if (fileObjs.length === 0) {
    return null;
  }

  return (
    <FileList>
      {fileObjs.map((obj) => (
        <FileItem
          key={`${obj.file.name}-${obj.file.size}`}
          data-testid={`file-item-${obj.file.name}`}
        >
          <div className="name">
            <AppIcon icon="file" size={16} color={colors.primary} />
            <span title={obj.file.name}>{obj.file.name}</span>
            <em>{getSize(obj.file.size)}</em>
          </div>
          <Icon
            filename={obj.file.name}
            status={obj.status}
            remove={() => removeFile(obj.id)}
          />
          {obj.errorMsg && <ErrorMessage>{obj.errorMsg}</ErrorMessage>}
        </FileItem>
      ))}
    </FileList>
  );
}

interface Props {
  filename: string;
  status: "PENDING" | "UPLOADING" | "DONE" | "ERROR";
  remove: () => void;
}

function Icon({ filename, status, remove }: Readonly<Props>) {
  const { colors } = useColors();

  if (status === "UPLOADING") {
    return <Spinner />;
  } else if (status === "DONE") {
    return <AppIcon icon="check" size={16} color={colors.primary} />;
  } else {
    return (
      <button
        type="button"
        onClick={remove}
        aria-label={`${filename} 제거`}
        data-testid="remove-file"
      >
        <AppIcon icon="close" size={16} color={colors.error} />
      </button>
    );
  }
}

const FileList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 280px;
  overflow-y: auto;
`;

const FileItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 8px;
  row-gap: 6px; /* 👈 에러와 본문 간격 */
  padding: 8px 12px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  .name {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    span {
      max-width: 46ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${({ theme }) => theme.colors.primary};
    }
    em {
      font-style: normal;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.backgroundDefault};

    &:hover {
      background: ${({ theme }) => theme.colors.gray200};
    }
  }

  > button,
  > div:has(svg),
  > span:has(svg) {
    grid-row: 1;
    justify-self: end;
  }
`;

const ErrorMessage = styled(ErrorText)`
  grid-column: 1 / -1; /* 👈 에러는 전체 열을 가로질러 2행에 */
  grid-row: 2;
  margin-top: 2px;

  /* 살짝 띄워보이는 스타일 (가벼운 토스트 느낌) */
  padding: 6px 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.error}15; /* error 색의 연한 배경 */
  border-left: 3px solid ${({ theme }) => theme.colors.error};

  /* 부드럽게 등장 */
  animation: fadeInUp 140ms ease-out;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
