import { useEffect, useState } from "react";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleMemberDetail } from "@data/user";
import { MemberDetailType } from "@models/user";

interface Props {
  memberId: number | null;
  goBack: () => void;
}

export function MemberDetail({ memberId, goBack }: Readonly<Props>) {
  const [member, setMember] = useState<MemberDetailType>();

  useEffect(() => {
    // TODO: Fetch player data from the server
    setMember(sampleMemberDetail);
  }, []);

  if (memberId === null || member === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{member.name}</Subtitle>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;
