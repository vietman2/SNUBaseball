import styled from "styled-components";

export function InformationSimple() {
  return (
    <Container>
      <Image />
      <Body>부실 청소 가이드</Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const Image = styled.img`
  width: 320px;
  height: 200px;
  object-fit: cover;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground900};
  font-size: 18px;
  font-weight: 700;
`;
