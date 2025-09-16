import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px 12px;

  .section-left {
    flex: 1;

    > h4 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .section-middle {
    flex: 2;
  }

  .section-right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  .section-text-primary {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    font-size: 1.125rem;
  }

  .section-text-secondary {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
    font-size: 1rem;
  }

  .section-text-tertiary {
    color: ${({ theme }) => theme.colors.textDisabled};
    font-weight: 400;
    font-size: 0.875rem;
  }
`;
