import styled from "styled-components";

export const WarningText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.warning};
`;
