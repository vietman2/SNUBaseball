import styled from "styled-components";

const Container = styled.div`
  position: relative;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 8px 12px;
  gap: 8px;
`;

const Placeholder = styled.span`
  display: flex;
  padding: 4px 8px;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.colors.textDisabled};
`;

const SelectedArea = styled(ItemsContainer)`
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 4px 4px 0 0;

  > button {
    display: inline-flex;
    align-items: center;
    gap: 4px;

    position: relative;

    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};

    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray500};
    }

    > svg {
      position: absolute;
      top: -5px;
      right: -5px; 
    }
  }
`;

const Options = styled(ItemsContainer)`
  min-height: 120px;
  border: 0.5px solid ${({ theme }) => theme.colors.divider};
  border-radius: 0 0 4px 4px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

export const SelectMenu = {
  Container,
  ItemsContainer,
  Placeholder,
  SelectedArea,
  Options,
};
