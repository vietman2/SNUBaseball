import styled from "styled-components";

export const Segment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span.title {
    margin-left: 4px;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .major-select {
    flex: 1;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 4px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 0.95rem;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    }
  }
`;

export const Horizontal = styled.div`
  display: flex;
  gap: 8px;
`;

export const Vertical = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;
