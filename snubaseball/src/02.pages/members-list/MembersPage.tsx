import { Metadata } from "next";
import Link from "next/link";

import { Container, MembersList } from "./ui/styles";
import { MemberCard } from "@entities/rosters";
import { getRoster } from "@entities/rosters/server";

export const metadata: Metadata = {
  title: "선수 • 매니저 | 서울대 야구부",
  description: "서울대 야구부",
};

export async function MembersPage() {
  const currentYear = new Date().getFullYear();
  const semester = new Date().getMonth() < 8 ? "1학기" : "2학기";
  const semester_code = `${currentYear}-${semester === "1학기" ? "1" : "2"}`;

  const members = await getRoster(semester_code);

  return (
    <Container>
      <h1>
        {currentYear}년 {semester} 서울대 야구부
      </h1>
      <MembersList>
        <h3>매니저</h3>
        <div className="member-page-list">
          {members.managers.map((manager) => (
            <Link href={`/members/${manager.id}`} key={manager.id}>
              <MemberCard roster_member={manager} />
            </Link>
          ))}
        </div>
      </MembersList>
      <MembersList>
        <h3>선수</h3>
        <div className="member-page-list">
          {members.players.map((player) => (
            <Link href={`/members/${player.id}`} key={player.id}>
              <MemberCard roster_member={player} />
            </Link>
          ))}
        </div>
      </MembersList>
    </Container>
  );
}
