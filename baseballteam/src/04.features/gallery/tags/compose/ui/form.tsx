import styled from "styled-components";

import { useTagForm } from "../contexts/useTagForm";
import { tagIconChoices } from "@entities/gallery/tags";
import { SubmitButton } from "@shared/ui/Buttons";
import { InlineTextInput } from "@shared/ui/Inputs";
import { ColorPicker, IconPicker } from "@shared/ui/Pickers";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  mode: "CREATE" | "EDIT";
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  close: () => void;
  isButtonDisabled: boolean;
}

export function TagForm({
  mode,
  submit,
  close,
  isButtonDisabled,
}: Readonly<Props>) {
  const { name, setName, color, setColor, icon, setIcon, errorMsg } =
    useTagForm();

  return (
    <Container onSubmit={submit} data-testid="tag-form">
      <h3>{mode === "CREATE" ? "새 태그 추가" : "태그 수정"}</h3>
      <Form>
        <ColorPicker color={color} onChange={setColor} size={24} />
        <DisplayArea style={{ backgroundColor: `${color}25`, color }}>
          <IconPicker
            options={tagIconChoices}
            icon={icon}
            color={color}
            onChange={setIcon}
            size={16 * 0.85}
          />
          <InlineTextInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size={Math.max(name.length, 1)}
            style={{ color }}
            data-testid="tag-name-input"
          />
        </DisplayArea>
      </Form>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <Buttons>
        <Button type="button" onClick={close} className="cancel-button">
          취소
        </Button>
        <Button
          type="submit"
          data-testid="submit-tag"
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
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

const Buttons = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 8px;
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
