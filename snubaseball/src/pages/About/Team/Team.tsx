import styled from "styled-components";

export function Team() {
  return (
    <Container>
      <Wrapper>
        <span>개요</span>
        <p>
          국립대학법인 서울대학교는 개교 이래의 전통을 계승하고 시대적 변화에
          적극 대응함으로써 도약과 발전의 새로운 역사를 창조하고자 한다.
          서울대학교는 자유롭고 비판적이며 창의적인 학문의 전당으로서 대학의
          자율과 사회적 책임의 중요성을 되새기면서 진리 탐구의 사명에 충실할
          것을 다짐한다. 서울대학교는 학문적 가치 창조의 중심축으로서 세계를
          선도할 진취적인 인재를 양성하고 최고 수준의 연구를 축적하여 인류문명의
          발전에 공헌하기 위해 노력한다. 대학야구 내에서 서울대학교는 “공부하는
          야구선수” 의 기치를 드높이며 학생 본연의 임무인 학업을 소홀히 하지
          않으면서도 야구 선수로서의 자세와 능력을 함양하기 위해 최선을 다하고
          있다.
        </p>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > span {
    font-size: 1.5rem;
    font-weight: 600;
  }

  > p {
    font-size: 1rem;
    line-height: 2rem;
  }
`;
