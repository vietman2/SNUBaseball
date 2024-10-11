import styled from "styled-components";

export function Stats() {
  return (
    <Container>
      <div>Stats</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
