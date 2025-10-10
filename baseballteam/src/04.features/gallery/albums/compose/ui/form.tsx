import styled from "styled-components";

import { useAlbumForm } from "../contexts/useAlbumForm";
import { useColors } from "@shared/lib/styles";
import { SubmitButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";
import { InlineTextInput } from "@shared/ui/Inputs";
import { ColorPicker } from "@shared/ui/Pickers";
import { ErrorText } from "@shared/ui/Texts";
import { TooltipWrapper } from "@shared/ui/Tooltips";

interface Props {
  mode: "CREATE" | "EDIT";
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  close: () => void;
  isButtonDisabled: boolean;
}

export function AlbumForm({ mode, submit, close, isButtonDisabled }: Readonly<Props>) {
  const {
    title,
    setTitle,
    color,
    setColor,
    membersOnly,
    toggleMembersOnly,
    errorMsg,
  } = useAlbumForm();
  const { colors } = useColors();

  return (
    <Container onSubmit={submit} data-testid="album-form">
      <h3>{mode === "CREATE" ? "새 앨범 추가" : "앨범 수정"}</h3>
      <Horizontal>
        <ColorPicker color={color} onChange={setColor} size={24} />
        <DisplayArea style={{ backgroundColor: `${color}40`, color }}>
          <InlineTextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size={Math.max(title.length, 1)}
            style={{ color }}
            data-testid="album-title-input"
          />
        </DisplayArea>
        <TooltipWrapper
          text={`부원 전용 앨범으로 설정${
            membersOnly ? "합니다." : "하지 않습니다."
          }`}
        >
          <Checkbox
            type="button"
            onClick={toggleMembersOnly}
            data-testid="memberonly-checkbox"
          >
            <AppIcon
              icon={membersOnly ? "lock" : "lock-open"}
              size={24}
              color={membersOnly ? colors.textPrimary : colors.gray400}
            />
          </Checkbox>
        </TooltipWrapper>
      </Horizontal>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <Buttons>
        <Button type="button" onClick={close} className="cancel-button">
          취소
        </Button>
        <Button
          type="submit"
          data-testid="submit-album"
          disabled={isButtonDisabled}
        >
          {mode === "CREATE" ? "추가" : "수정"}
        </Button>
      </Buttons>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const DisplayArea = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  max-height: 32px;
  padding: 4px 8px;
  gap: 4px;

  border-radius: 4px;
`;

const Buttons = styled(Horizontal)`
  align-items: flex-end;
  justify-content: flex-end;
`;

const Button = styled(SubmitButton)`
  padding: 6px 10px;
  font-size: 0.875rem;
  border-radius: 4px;

  &.cancel-button {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Checkbox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
`;
