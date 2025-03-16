import styled from "styled-components";

export function Staff() {
  return (
    <Container>
      <Wrapper>
        <span>지도교수</span>
        <Horizontal>
          <div>
            <img src="https://picsum.photos/200/300?random=1" alt="teacher" />
            <span>장원철 교수님</span>
          </div>
          <div>
            <span>지도교수님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Wrapper>
        <span>감독</span>
        <Horizontal>
          <div>
            <img src="https://picsum.photos/200/300?random=2" alt="teacher" />
            <span>이광환 감독님</span>
          </div>
          <div>
            <span>감독님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Wrapper>
        <span>코치</span>
        <Horizontal>
          <div>
            <img src="https://picsum.photos/200/300?random=3" alt="teacher" />
            <span>이정호 코치님</span>
          </div>
          <div>
            <span>코치님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 36px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > span:first-child {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    > img {
      width: 80px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
    }

    > span {
      font-size: 1rem;
    }
  }

  > div:last-child {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    padding: 0 16px;

    > span {
      font-size: 1rem;
    }
  }
`;
