import { Divider } from "@components/Dividers";
import { Quote } from "@components/Texts";
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
          <Quote
            quote="팀워크와 응원에서 누구보다 빛나는 서울대 야구부의 전통이 앞으로도
              이어지길 바라며, 학업과 훈련을 병행하며 새로운 도전에 나서는
              여러분을 항상 응원합니다."
          />
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
          <Quote quote="야구선수의 교실은 야구장이다. 야구를 통해 인생을 배우는, '공부하는 야구선수'가 되라." />
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
          <Quote quote="야구선수가 해야 할 일은 '이기는 것'이고, 지더라도 부끄럽지 않게 지는 것이 우리의 목표이다." />
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
          <Quote quote="언제 어디서나 그 자리에 없어선 안 될 사람이 되자." />
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
  gap: 24px;
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
  gap: 48px;

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 8px;
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    > img {
      width: 200px;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 768px) {
        width: 120px;
        height: 160px;
      }
    }

    > span {
      font-size: 1.25rem;

      @media (max-width: 768px) {
        font-size: 1.125rem;
      }
    }
  }
`;
