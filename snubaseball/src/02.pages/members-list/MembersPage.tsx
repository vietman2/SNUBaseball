import { Metadata } from "next";
import Link from "next/link";

import { Container, MembersList } from "./ui/styles";
import { ContentWrapper } from "@widgets/layouts";
import { MemberCard } from "@entities/members";
import { getActiveMembers } from "@entities/members/server";

export async function generateMetadata(): Promise<Metadata> {
  // get year from date
  const currentYear = new Date().getFullYear();
  // 9월 이전이면 1학기, 9월 이후면 2학기
  const semester = new Date().getMonth() < 8 ? "1학기" : "2학기";

  return {
    title: `${currentYear}년 ${semester} | 서울대 야구부`,
    description: `${currentYear}년 ${semester} 서울대 야구부`,
  };
}

export async function MembersPage() {
  const members = await getActiveMembers();

  const currentYear = new Date().getFullYear();
  const semester = new Date().getMonth() < 8 ? "1학기" : "2학기";

  return (
    <ContentWrapper>
      <Container>
        <h1>
          {currentYear}년 {semester} 서울대 야구부
        </h1>
        <MembersList>
          <h3>매니저</h3>
          <div className="member-page-list">
            {members.managers.map((manager) => (
              <Link href={`/members/${manager.id}`} key={manager.id}>
                <MemberCard member={manager} />
              </Link>
            ))}
          </div>
        </MembersList>
        <MembersList>
          <h3>선수</h3>
          <div className="member-page-list">
            {members.players.map((player) => (
              <Link href={`/members/${player.id}`} key={player.id}>
                <MemberCard member={player} isPlayer />
              </Link>
            ))}
          </div>
        </MembersList>
      </Container>
    </ContentWrapper>
  );
}
