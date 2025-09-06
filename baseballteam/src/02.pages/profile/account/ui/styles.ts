import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px 12px 4px 4px;

  .section-left {
    flex: 1;

    > h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray600};
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
    color: ${({ theme }) => theme.colors.gray900};
    font-weight: 600;
    font-size: 1.125rem;
  }

  .section-text-secondary {
    color: ${({ theme }) => theme.colors.gray800};
    font-weight: 600;
    font-size: 1rem;
  }

  .section-text-tertiary {
    color: ${({ theme }) => theme.colors.gray700};
    font-weight: 400;
    font-size: 0.875rem;
  }
`;
