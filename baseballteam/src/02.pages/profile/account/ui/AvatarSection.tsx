import { useState } from "react";
import styled from "styled-components";

import { Section } from "./styles";
import { ModalDialog, ModalOverlay } from "@widgets/modal";
import { UpdateImageModal } from "@features/profile/updateImage";
import { UserAvatar, type UserProfileType } from "@entities/user";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { SimpleTooltip } from "@shared/ui/Tooltips";

interface Props {
  user: UserProfileType;
}

export function AvatarSection({ user }: Readonly<Props>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { colors } = useColors();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <div className="section-left">
          <h4>프로필</h4>
        </div>
        <div className="section-middle">
          <ProfileAvatar>
            <button
              className="update-profile-button"
              onClick={openModal}
              data-testid="open-modal-button"
            >
              <UserAvatar user={user} size={40} />
              <span className="update-profile-icon">
                <AppIcon icon="pencil" size={16} color={colors.primaryDark} />
              </span>
            </button>
            <div>
              <span className="section-text-primary">
                {user.member.name}{" "}
                <span className="section-text-tertiary">
                  ({user.member.student_id})
                </span>
              </span>
              <span className="section-text-tertiary">{user.username}</span>
            </div>
          </ProfileAvatar>
        </div>
        <InfoWrapper className="section-right">
          <SimpleTooltip text="이름, 학번 변경은 주장단에 문의해주세요." />
        </InfoWrapper>
      </Wrapper>
      {isModalOpen && (
        <ModalOverlay
          $exiting={!isModalOpen}
          $animationLength={200}
          onMouseDown={closeModal}
          data-testid="modal-overlay"
        >
          <ModalDialog
            $exiting={!isModalOpen}
            $animationLength={200}
            onMouseDown={(e) => e.stopPropagation()}
            data-testid="modal-dialog"
          >
            <UpdateImageModal
              memberId={user.member.id}
              originalImageUrl={user.member.profile_image?.url ?? null}
              postUpload={closeModal}
            />
          </ModalDialog>
        </ModalOverlay>
      )}
    </>
  );
}

const Wrapper = styled(Section)`
  .update-profile-button {
    position: relative;

    .update-profile-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      position: absolute;
      top: -6px;
      right: -6px;
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 50%;
    }
  }
`;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
