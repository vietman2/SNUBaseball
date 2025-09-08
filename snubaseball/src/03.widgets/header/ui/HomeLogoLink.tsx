import Link from "next/link";
import styled from "styled-components";

import { Logo } from "@shared/ui/Icons";

export function HomeLogoLink() {
  return (
    <Container>
      <Link href="/">
        <Logo size={48} />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1;
  }
`;
