import { Container, MembersList } from "./ui/styles";
import { MemberCardSkeleton } from "@entities/members";

export function MembersPageLoading() {
  return (
    <Container>
      <MembersList>
        <h3>매니저</h3>
        <div className="member-page-list">
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
        </div>
      </MembersList>
      <MembersList>
        <h3>선수</h3>
        <div className="member-page-list">
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
        </div>
      </MembersList>
    </Container>
  );
}
