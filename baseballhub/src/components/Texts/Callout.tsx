import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface Props {
  text: string;
}

export function Callout({ text }: Readonly<Props>) {
  return (
    <Container>
      <AppIcon icon="lightbulb" size={24} color="yellow" />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background100};
  padding: 4px 12px;
  margin: 0 0 16px 0;
  border-radius: 5px;
  shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
  margin-left: 16px;
`;
