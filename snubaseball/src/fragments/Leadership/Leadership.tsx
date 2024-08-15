import styled from "styled-components";

import { Subtitle } from "@components/Texts";

export function Leadership() {
  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
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
