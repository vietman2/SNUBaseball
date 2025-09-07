import styled from "styled-components";

import { AcademicsSection } from "./ui/AcademicsSection";
import { AvatarSection } from "./ui/AvatarSection";
import { ContactsSection } from "./ui/ContactsSection";
import { useUser } from "@entities/user";
import { useColors } from "@shared/lib/styles";
import { Divider } from "@shared/ui/Dividers";

export function AccountPage() {
  const { user } = useUser();
  const { colors } = useColors();

  if (!user) return null;

  return (
    <Container>
      <h3>계정 상세</h3>
      <Divider color={colors.divider} />
      <AvatarSection user={user} />
      <Divider color={colors.divider} />
      <AcademicsSection memberId={user.member.id} major={user.member.major} />
      <Divider color={colors.divider} />
      <ContactsSection
        memberId={user.member.id}
        phone={user.member.phone}
        email={user.member.email}
        address={user.member.address}
      />
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
