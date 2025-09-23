import {
  AvatarWrapper,
  PageContainer,
  Header,
  ProfileContainer,
} from "./ui/styles";
import { Skeleton } from "@shared/ui/Loading";

export function MemberDetailsPageLoading() {
  return (
    <PageContainer>
      <Header>
        <AvatarWrapper>
          <Skeleton height={400} />
        </AvatarWrapper>
        <ProfileContainer>
          <Skeleton height={24} width={40} />
          <Skeleton height={40} width={100} />
          <Header>
            <Skeleton height={36} width={320} />
            <Skeleton height={36} width={320} />
          </Header>
          <Header>
            <Skeleton height={36} width={320} />
            <Skeleton height={36} width={320} />
          </Header>
          <Header>
            <Skeleton height={36} width={320} />
            <Skeleton height={36} width={320} />
          </Header>
          <Header>
            <Skeleton height={36} width={320} />
            <Skeleton height={36} width={320} />
          </Header>
        </ProfileContainer>
      </Header>
    </PageContainer>
  );
}
