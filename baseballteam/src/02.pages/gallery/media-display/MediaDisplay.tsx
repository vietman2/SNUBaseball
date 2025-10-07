import { useNavigate } from "react-router";
import styled from "styled-components";

import { SimpleModal, SimpleModalPage, useSimpleModal } from "@widgets/modal";
import { DeleteMediaButton } from "@features/gallery/media/delete";
import { EditMediaForm } from "@features/gallery/media/edit";
import { useMedia } from "@entities/gallery/media";
import { useUser } from "@entities/user";
import { EditButton } from "@shared/ui/Buttons";

export function MediaDisplay() {
  const { isOpen, open, close } = useSimpleModal();
  const { selectedMedia } = useMedia();
  const navigate = useNavigate();
  const { user } = useUser();

  const hasPermission = () => {
    // 유저가 ADMIN, LEADER, STAFF인 경우
    if (
      user?.role === "ADMIN" ||
      user?.role === "LEADER" ||
      user?.role === "STAFF"
    ) {
      return true;
    }

    // 유저가 MEMBER인 경우, 업로더가 본인인 경우에만 권한 부여
    if (
      user?.role === "MEMBER" &&
      selectedMedia?.uploaded_by.uuid === user.uuid
    ) {
      return true;
    }

    return false;
  };

  const closeMedia = () => {
    navigate("/gallery", { replace: true });
  };

  if (!selectedMedia) return null;

  return (
    <SimpleModalPage onCloseTarget="/gallery">
      {hasPermission() && (
        <>
          <ButtonWrapper>
            <EditButton onClick={open} label="" testID={`edit-button-${selectedMedia.id}`} />
            <DeleteMediaButton media={selectedMedia} postDelete={closeMedia} />
          </ButtonWrapper>
          <SimpleModal isOpen={isOpen} onClose={close} minWidth={480}>
            <EditMediaForm media={selectedMedia} closeMedia={closeMedia} />
          </SimpleModal>
        </>
      )}
      {selectedMedia.type === "IMAGE" ? (
        <Image src={selectedMedia.url} alt={selectedMedia.filename} />
      ) : (
        <Video controls>
          <source src={selectedMedia.url} type="video/mp4" />
        </Video>
      )}
    </SimpleModalPage>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: absolute;
  top: -24px;
  right: 4px;
`;

const Image = styled.img`
  max-width: 90vw;
  max-height: 90vh;
`;

const Video = styled.video`
  max-width: 90vw;
  max-height: 90vh;
`;
