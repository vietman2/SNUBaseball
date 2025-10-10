import styled from "styled-components";

import { Section, SectionSubtitle } from "./styles";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { UpdateAvatarForm } from "@features/members/updateAvatar";
import { UserAvatarWithEdit, type UserProfileType } from "@entities/user";
import { SimpleTooltip } from "@shared/ui/Tooltips";

interface Props {
  user: UserProfileType;
}

export function AvatarSection({ user }: Readonly<Props>) {
  const { isOpen, open, close } = useSimpleModal();

  return (
    <>
      <Section>
        <SectionSubtitle>프로필</SectionSubtitle>
        <Contents>
          <UserAvatarWithEdit user={user} open={open} size={40} />
          <ProfileInfo>
            <NameText>
              {user.member.name} <InfoText>({user.member.student_id})</InfoText>
            </NameText>
            <InfoText>{user.username}</InfoText>
          </ProfileInfo>
        </Contents>
        <TooltipWrapper>
          <SimpleTooltip text="이름, 학번 변경은 주장단에 문의해주세요." />
        </TooltipWrapper>
      </Section>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <UpdateAvatarForm
          memberId={user.member.id}
          originalImageUrl={user.member.profile_image ?? null}
          postUpload={close}
        />
      </SimpleModal>
    </>
  );
}

const Contents = styled.div`
  display: flex;
  flex: 2;
  gap: 16px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NameText = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  font-size: 1.125rem;
`;

const InfoText = styled.span`
  color: ${({ theme }) => theme.colors.textDisabled};
  font-weight: 400;
  font-size: 0.875rem;
`;

const TooltipWrapper = styled.div`
  display: flex;
  flex: 1;
  align-self: center;
  justify-content: flex-end;
`;
