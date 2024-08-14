import styled from "styled-components";

export function LoadingPage() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
