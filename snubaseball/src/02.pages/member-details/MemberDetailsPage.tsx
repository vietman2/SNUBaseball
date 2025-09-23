import { Metadata } from "next";
import Image from "next/image";

import {
  AvatarWrapper,
  PageContainer,
  Header,
  ProfileContainer,
} from "./ui/styles";
import { Breadcrumb, BreadcrumbItemType } from "@widgets/breadcrumb";
import { MemberInfo, RoleBadge } from "@entities/rosters";
import { getRosterMember } from "@entities/rosters/server";

interface Props {
  params: Promise<{ memberId: string }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { memberId } = await params;

  const member = await getRosterMember(Number(memberId));

  return {
    title: `${member.member.name} | SNU Baseball`,
    description: `${member.member.name} 선수의 프로필 페이지입니다.`,
    openGraph: {
      title: `${member.member.name} | SNU Baseball`,
      description: `${member.member.name} 선수의 프로필 페이지입니다.`,
    },
  };
}

export async function MemberDetailsPage({ params }: Readonly<Props>) {
  const { memberId } = await params;

  const data = await getRosterMember(Number(memberId));

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "선수 • 매니저", href: "/members", isLastItem: false },
    { label: data.member.name, href: null, isLastItem: true },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />
      <Header>
        <div>
          <AvatarWrapper>
            <Image
              src={
                data.member.profile_image ||
                "https://cdn.snubaseball.co.kr/profiles/default_profile.png"
              }
              alt={data.member.name}
              fill
            />
          </AvatarWrapper>
        </div>
        <ProfileContainer>
          <RoleBadge role={data.role} />
          <h1>{data.member.name}</h1>
          <MemberInfo member={data} />
        </ProfileContainer>
      </Header>
    </PageContainer>
  );
}
