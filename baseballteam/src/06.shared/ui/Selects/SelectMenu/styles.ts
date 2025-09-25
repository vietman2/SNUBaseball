import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 4px 8px;
  gap: 8px;
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  width: 100%;

  border-radius: 4px;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const SelectedArea = styled(ItemsContainer)`
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 4px 4px 0 0;
`;

export const Item = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  gap: 6px;

  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  background-color: ${({ theme }) => theme.colors.backgroundPaper};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDefault};
  }
`;

export const Placeholder = styled.button`
  display: flex;
  padding: 4px 8px;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.colors.textDisabled};
`;

export const Options = styled(ItemsContainer)`
  min-height: 120px;
  border: 0.5px solid ${({ theme }) => theme.colors.divider};
  border-radius: 0 0 4px 4px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;
