import { useNavigate } from "react-router";
import styled from "styled-components";

interface Props {
  label?: string;
  path?: string;
}

export function NotFoundWidget({ label = "뒤로가기", path }: Readonly<Props>) {
  const navigate = useNavigate();

  const goBack = () => {
    if (path) {
      navigate(path);
    } else {
      navigate(-1);
    }
  };

  return (
    <Container>
      <h6>존재하지 않는 페이지입니다.</h6>
      <BackButton onClick={goBack}>{label}</BackButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 32px;

  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};

  > h6 {
    margin: 0;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray300};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;
