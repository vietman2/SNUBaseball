import styled from "styled-components";

interface Props {
  $backgroundColor?: string;
  $color?: string;
}


export const ElevatedTextButton = styled.button<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  gap: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, $color }) => $color ?? theme.colors.gray900};

  border-radius: 8px;
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor ?? theme.colors.gray100};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;
