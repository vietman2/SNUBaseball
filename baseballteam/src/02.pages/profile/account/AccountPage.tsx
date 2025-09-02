import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { Divider } from "@shared/ui/Dividers";

export function AccountPage() {
  const { colors } = useColors();

  return (
    <Container>
      <h3>계정</h3>
      <Divider color={colors.divider} />
      <div />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
