import styled from "styled-components";

import { TextDivider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { Caption, Subtitle, Title } from "@components/Texts";

const subtitle =
  "종무식은 1년 동안의 대장정을 마무리하는 자리로, 감독님, 지도교수님, 선배님, 선수, 매니저들이 모두 참가하여 야구부의 지난 시즌을 복기하고 새로운 시즌을 기획하는 행사입니다. 1년 동안 팀을 이끌어온 주장단의 노고에 대한 치하와 앞으로 팀을 이끌 새로운 주장, 수석매니저를 임명하는 임명식이 진행됩니다.";

export function Closing() {
  return (
    <>
      <Title title="종무식" subtitle="한 해의 마무리" />
      <Caption text={subtitle} />
      <TextDivider text="" />
      <Leadership>
        <Subtitle subtitle="CHEER FOR 2024" icon="baseball" />
        <Leaders>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[주장]</Role> 임준원_수학교육과 20
            </Name>
            <Words>다짐을 적어주세요</Words>
          </Leader>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[부주장]</Role> 김정규_체육교육과 22
            </Name>
            <Words>다짐을 적어주세요</Words>
          </Leader>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[수석매니저]</Role> 최연우_건축학과 22
            </Name>
            <Words>다짐을 적어주세요</Words>
          </Leader>
        </Leaders>
        <Subtitle subtitle="THANKS TO 2023" icon="baseball" />
        <Leaders>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[주장]</Role> 임준원_수학교육과 20
            </Name>
            <Words>소감을 적어주세요</Words>
          </Leader>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[부주장]</Role> 김정규_체육교육과 22
            </Name>
            <Words>소감을 적어주세요</Words>
          </Leader>
          <Leader>
            <Image>PHOTO</Image>
            <Name>
              <Role>[수석매니저]</Role> 최연우_건축학과 22
            </Name>
            <Words>소감을 적어주세요</Words>
          </Leader>
        </Leaders>
      </Leadership>
      <TextDivider text="" />
      <Plans>
        <Subtitle subtitle="2024년 운영계획" icon="bat" />
        <List>
          <ListItem>
            <AppIcon icon="checkbox" size={30} color="black" />
            <Plan>내용을 입력하세요</Plan>
          </ListItem>
          <ListItem>
            <AppIcon icon="checkbox" size={30} color="black" />
            <Plan>내용을 입력하세요</Plan>
          </ListItem>
          <ListItem>
            <AppIcon icon="checkbox" size={30} color="black" />
            <Plan>내용을 입력하세요</Plan>
          </ListItem>
        </List>
      </Plans>
    </>
  );
}

const Leadership = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 20px;
`;

const Leaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Leader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const Image = styled.div`
  display: flex;
  width: 70%;
  height: 15vh;
  align-items: center;
  justify-content: center;
  font-weight: bold;
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

const Words = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
`;

const Plans = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const Plan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px;
`;
