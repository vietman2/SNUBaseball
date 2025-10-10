import styled from "styled-components";

import { Horizontal, Segment, Vertical } from "../styles";
import { StudentIDInput, useNameIDInput } from "@entities/members";

export function NameIdSegment() {
  const { name, setName, isPlayer, setIsPlayer } = useNameIDInput();

  const selectPlayer = () => {
    setIsPlayer(true);
  };

  const selectManager = () => {
    setIsPlayer(false);
  };

  return (
    <Segment>
      <ToggleContainer>
        <ToggleButton
          onClick={selectPlayer}
          $isActive={isPlayer}
          data-testid="role-toggle-player"
        >
          선수
        </ToggleButton>
        <ToggleButton
          onClick={selectManager}
          $isActive={!isPlayer}
          data-testid="role-toggle-manager"
        >
          매니저
        </ToggleButton>
      </ToggleContainer>
      <Horizontal>
        <Vertical>
          <span className="title">이름</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            data-testid="name-input"
            required
          />
        </Vertical>
        <Vertical style={{ flex: 1.5 }}>
          <span className="title">학번</span>
          <StudentIDInput />
        </Vertical>
      </Horizontal>
    </Segment>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  gap: 8px;

  margin-bottom: 8px;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 4px 8px;

  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  font-size: 1rem;

  outline: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? `${theme.colors.primary}50` : theme.colors.gray100};

  transition: background-color 0.2s;
`;
