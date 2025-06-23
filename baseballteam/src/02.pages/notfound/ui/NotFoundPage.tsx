import { useNavigate } from "react-router";
import styled from "styled-components";

interface Props {
  label?: string;
  path?: string;
}

export function NotFoundPage({ label = "뒤로가기", path }: Readonly<Props>) {
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

  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text500};

  z-index: 1000;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.text700};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background700};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;
