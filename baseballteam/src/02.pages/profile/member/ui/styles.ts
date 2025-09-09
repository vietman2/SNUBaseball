import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.gray900};

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
