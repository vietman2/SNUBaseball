import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    padding: 8px 0;

    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;

    &:hover {
      cursor: pointer;
    }
  }

  .update-error-text {
    margin: 0;
    padding: 0 16px;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 24px;
  gap: 16px;

  .profile-form-label {
    flex: 1;
    text-align: right;
    font-weight: 500;
  }

  .profile-form-value {
    display: flex;
    flex: 4;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-weight: 500;

    > input {
      padding: 8px 12px;
      min-width: 140px;
      max-width: 140px;
      border: none;
      background-color: ${({ theme }) => theme.colors.gray100};
      border-radius: 8px;
      font-size: 0.875rem;
      font-family: inherit;
      color: ${({ theme }) => theme.colors.gray900};
    }
  }

  .padding-left {
    padding-left: 8px;
  }
`;
