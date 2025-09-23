import styled from "styled-components";

export function ComingSoon() {
  return <Container>준비 중인 기능입니다. 곧 찾아뵙겠습니다!</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
