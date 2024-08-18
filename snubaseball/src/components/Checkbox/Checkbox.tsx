import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface Props {
  text: string;
}

export function Checkbox({ text }: Props) {
  return (
    <Container>
      <AppIcon icon="checkbox" size={30} color="black" />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px;
`;
