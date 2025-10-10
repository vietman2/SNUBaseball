import styled from "styled-components";

export const MenuContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  width: 100%;

  border-radius: 4px;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;
