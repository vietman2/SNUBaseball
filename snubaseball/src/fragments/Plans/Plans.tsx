import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { Subtitle } from "@components/Texts";

export function Plans() {
  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
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
