import styled from "styled-components";

interface ErrorPageProps {
  message?: string;
  buttonText?: string;
  onClick?: () => void;
}

export function ErrorPage({
  message = "존재하지 않는 페이지입니다.",
  buttonText = "뒤로가기",
  onClick,
}: Readonly<ErrorPageProps>) {
  return (
    <FullScreen>
      <div>{message}</div>
      {onClick && <button onClick={onClick}>{buttonText}</button>}
    </FullScreen>
  );
}

const FullScreen = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  gap: 24px;

  > button {
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background100};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
