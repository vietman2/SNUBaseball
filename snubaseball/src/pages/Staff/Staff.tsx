import { Divider } from "@components/Dividers";
import styled from "styled-components";

export function Staff() {
  return (
    <Container>
      <Wrapper>
        <span>지도교수</span>
        <Horizontal>
          <div>
            <img
              src="https://kr.object.ncloudstorage.com/snubaseball/profiles/person.png"
              alt="professor"
            />
            <span>장원철 교수님</span>
          </div>
          <div>
            <span>지도교수님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Divider />
      <Wrapper>
        <span>감독</span>
        <Horizontal>
          <div>
            <img
              src="https://kr.object.ncloudstorage.com/snubaseball/profiles/person.png"
              alt="manager"
            />
            <span>이광환 감독님</span>
          </div>
          <div>
            <span>감독님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Divider />
      <Wrapper>
        <span>코치</span>
        <Horizontal>
          <div>
            <img
              src="https://kr.object.ncloudstorage.com/snubaseball/profiles/person.png"
              alt="coach"
            />
            <span>최우혁 코치님</span>
          </div>
          <div>
            <span>코치님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Divider />
      <Wrapper>
        <span>코치</span>
        <Horizontal>
          <div>
            <img
              src="https://kr.object.ncloudstorage.com/snubaseball/profiles/person.png"
              alt="coach"
            />
            <span>이케빈 코치님</span>
          </div>
          <div>
            <span>코치님 말씀</span>
          </div>
        </Horizontal>
      </Wrapper>
      <Divider />
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
    gap: 8px;

    > img {
      width: 180px;
      height: 250px;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 768px) {
        width: 120px;
        height: 150px;
      }
    }

    > span {
      font-size: 1.25rem;

      @media (max-width: 768px) {
        font-size: 1.125rem;
      }
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
