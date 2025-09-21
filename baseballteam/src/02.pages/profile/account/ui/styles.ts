import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 12px;
`;

export const SectionSubtitle = styled.h4`
  flex: 1;
  margin: 0;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
