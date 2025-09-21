import styled from "styled-components";

import { AcademicsSection } from "./ui/AcademicsSection";
import { AvatarSection } from "./ui/AvatarSection";
import { ContactsSection } from "./ui/ContactsSection";
import { DatesSection } from "./ui/DatesSection";
import { useUser } from "@entities/user";
import { Divider } from "@shared/ui/Dividers";

export function AccountPage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Container>
      <h3>계정 상세</h3>
      <Divider />
      <AvatarSection user={user} />
      <Divider />
      <AcademicsSection memberId={user.member.id} major={user.member.major} />
      <Divider />
      <ContactsSection
        memberId={user.member.id}
        phone={user.member.phone}
        email={user.member.email}
        address={user.member.address}
      />
      <Divider />
      <DatesSection
        memberId={user.member.id}
        birthDate={user.member.birth_date}
        joinDate={user.member.date_joined}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow-y: auto;

  > h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
