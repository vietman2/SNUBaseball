import styled from "styled-components";

import { Divider, TextDivider } from "@components/Dividers";
import { EmptyTabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { Interview, Memories } from "@fragments/Archive";

export default function Archive() {
  const navigateMore = () => {};

  return (
    <>
      <EmptyTabs />
      <Container>
        <Title title="MEMORIES" subtitle="순간의 기록" />
        <TextDivider text="2024" />
        <ImageContainer>
          <Memories />
        </ImageContainer>
        <TextDivider text="2023" />
        <ImageContainer>
          <Memories />
        </ImageContainer>
        <Divider />
        <Button onClick={navigateMore}>{"MORE >>"}</Button>
        <Title title="INTERVIEW" subtitle="우리들의 이야기" />
        <Interview />
        <Divider />
        <Button onClick={navigateMore}>{"MORE >>"}</Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0px 10px 40px 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 280px;
  margin: 20px 0;
  padding: 0 0px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  color: #0f0f70;
  font-size: 16px;
  margin: 10px 20px;
  cursor: pointer;
`;
