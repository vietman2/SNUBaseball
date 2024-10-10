import styled from "styled-components";

import { InformationSimpleType } from "@models/forum";

interface Props {
  information: InformationSimpleType
}

export function InformationSimple({ information }: Readonly<Props>) {
  return (
    <Container>
      <Image src={information.image} />
      <Body>{information.title}</Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 0;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const Image = styled.img`
  width: 320px;
  height: 200px;
  object-fit: cover;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground900};
  font-size: 18px;
  font-weight: 700;
`;
