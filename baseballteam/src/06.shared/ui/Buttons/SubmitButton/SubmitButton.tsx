import styled from "styled-components";

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  font-size: 0.95rem;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
