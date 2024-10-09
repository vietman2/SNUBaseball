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
  padding: 0.25rem 0.75rem;
  margin: 0 0 1rem 0;
  border-radius: 5px;
  shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  font-size: 1rem;
  margin-left: 1rem;
`;
