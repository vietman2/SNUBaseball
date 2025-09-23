import { ReactNode } from "react";
import Image from "next/image";

import { MemberLayoutContainer, TeamImageContainer } from "./ui/styles";

interface Props {
  children: ReactNode;
}

export function MembersPageLayout({ children }: Readonly<Props>) {
  const currentYear = new Date().getFullYear();
  const semester = new Date().getMonth() < 8 ? "1학기" : "2학기";

  return (
    <MemberLayoutContainer>
      <TeamImageContainer>
        <Image
          src="https://cdn.snubaseball.co.kr/images/Main1.jpg"
          alt="team"
          fill
        />
        <div className="overlay-text">{`${currentYear}-${
          semester === "1학기" ? "1" : "2"
        } 서울대 야구부`}</div>
      </TeamImageContainer>
      {children}
    </MemberLayoutContainer>
  );
}
