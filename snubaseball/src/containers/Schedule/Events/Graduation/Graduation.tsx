import styled from "styled-components";

import { TextDivider } from "@components/Dividers";
import { Caption, Subtitle, Title } from "@components/Texts";

const subtitle =
  "졸업식은 야구부에 몸담았던 부원들의 졸업을 축하하는 자리입니다.\n오랜 시간 야구부를 위해 노력했던 부원들의 명예로운 마무리를 함께하며,\n앞으로의 여정을 향한 새로운 시작을 응원합니다.";

export function Graduation() {
  return (
    <>
      <Title title="졸업식" subtitle="새로운 시작" />
      <Caption text={subtitle} />
      <TextDivider text="" />
      <Horizontal>
        <Subtitle subtitle="CONGRATULATIONS!" icon="graduate" />
        <YearText>2024</YearText>
      </Horizontal>
      <Graduates>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[선수]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[선수]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[매니저]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[선수]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[선수]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
        <Graduate>
          <Image>IMAGE</Image>
          <Name>
            <Role>[매니저]</Role> 홍길동_경영학과 20
          </Name>
          <Period>활동기간 2019.03 ~ 2024.02</Period>
          <Words>소감을 적어주세요</Words>
        </Graduate>
      </Graduates>
    </>
  );
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 40px 0px 20px;
`;

const YearText = styled.div`
  display: flex;
  font-size: 20px;
  color: #0f0f70;
`;

const Graduates = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px 20px;
`;

const Graduate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 10px;
`;

const Image = styled.div`
  display: flex;
  width: 18.5vw;
  height: 20vw;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-top: 10px;
`;

const Role = styled.span`
  margin-right: 2.5px;
  color: #0f0f70;
`;

const Period = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #0f0f70;
  margin-top: 5px;
`;

const Words = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 14px;
`;
