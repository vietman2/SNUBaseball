import { AppIcon } from "@components/Icons";
import styled from "styled-components";

interface Props {
  subtitle: string;
  icon?: string;
}

export function Subtitle({ subtitle, icon }: Props) {
  return (
    <Container>
      {icon && <AppIcon icon={icon} size={30} color="#0f0f70" />}
      <Text>{subtitle}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;
