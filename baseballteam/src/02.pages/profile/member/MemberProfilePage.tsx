import { LoadingMemberProfileSection } from "./ui/_loading";
import { Container, Section } from "./ui/styles";
import { ErrorWidget } from "@widgets/error";
import { BasicProfileForm } from "@features/profile/updateProfile";
import { useMemberDetails } from "@entities/members";
import { useUser } from "@entities/user";
import { useColors } from "@shared/lib/styles";
import { Divider } from "@shared/ui/Dividers";

export function MemberProfilePage() {
  const { isAuthenticated, user } = useUser();
  if (!isAuthenticated) return null;

  return <InnerComponent memberId={user.member.id} />;
}

interface Props {
  memberId: number;
}

function InnerComponent({ memberId }: Readonly<Props>) {
  const { colors } = useColors();
  const {
    data: member,
    isError,
    isPending,
    refetch,
  } = useMemberDetails(memberId);

  if (isPending) return <LoadingMemberProfileSection />;

  if (isError || !member) {
    return (
      <ErrorWidget message="멤버 정보를 불러오는 중에 오류가 발생했습니다.">
        <button onClick={() => refetch()}>다시 시도</button>
      </ErrorWidget>
    );
  }

  return (
    <Container>
      <h3>프로필</h3>
      <Divider color={colors.divider} />
      <Section>
        <h4>기본 프로필</h4>
        <BasicProfileForm member={member} />
      </Section>
      <Divider color={colors.divider} />
    </Container>
  );
}
