import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  openForm: () => void;
}

export function AddNewMemberButton({ openForm }: Readonly<Props>) {
  return (
    <div>
      <ElevatedTextButton onClick={openForm}>새 부원 추가</ElevatedTextButton>
    </div>
  );
}

export function AddNewMemberTableButton({ openForm }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <TableRow onClick={openForm}>
      <span>
        <AppIcon icon="plus" size={20} color={colors.primary} />
      </span>
    </TableRow>
  );
}

const TableRow = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  max-height: 40px;

  border-top: 0.5px solid ${({ theme }) => theme.colors.gray400};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;
