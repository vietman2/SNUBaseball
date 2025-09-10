import { Container, MembersList } from "./ui/styles";
import { ContentWrapper } from "@widgets/layouts";
import { MemberCardSkeleton } from "@entities/members";

export function MembersPageLoading() {
  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
}
