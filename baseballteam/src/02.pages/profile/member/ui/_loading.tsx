import { Container, Section } from "./styles";
import { useColors } from "@shared/lib/styles";
import { Divider } from "@shared/ui/Dividers";
import { Skeleton } from "@shared/ui/Loading";

export function LoadingMemberProfileSection() {
  const { colors } = useColors();

  return (
    <Container>
      <h3>프로필</h3>
      <Divider color={colors.divider} />
      <Section>
        <h4>기본 프로필</h4>
        <Skeleton width="90%" height="32px" />
        <Skeleton width="90%" height="32px" />
        <Skeleton width="90%" height="32px" />
        <Skeleton width="90%" height="32px" />
      </Section>
      <Divider color={colors.divider} />
    </Container>
  );
}
