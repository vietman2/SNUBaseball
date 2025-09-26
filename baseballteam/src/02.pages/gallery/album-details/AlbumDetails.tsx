import { useParams } from "react-router";
import styled from "styled-components";

import { Media } from "./ui/Media";
import { Breadcrumb } from "@widgets/breadcrumb";
import { ErrorWidget } from "@widgets/error";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { ViewToggle } from "@widgets/viewtoggle";
import {
  UploadMediaForm,
  UploadMediaFormProvider,
} from "@features/gallery/uploadMedia";
import {
  AlbumDetailsProvider,
  MediaSelectsProvider,
  useAlbumDetails,
} from "@entities/gallery";
import { ElevatedLink, ElevatedTextButton } from "@shared/ui/Buttons";

export function AlbumDetails() {
  const { id } = useParams<{ id: string }>();

  if (!id || isNaN(Number(id))) {
    return (
      <ErrorWidget message="유효하지 않은 앨범 ID입니다.">
        <div>
          <ElevatedLink to="/gallery">앨범 목록으로 돌아가기</ElevatedLink>
        </div>
      </ErrorWidget>
    );
  }

  return (
    <AlbumDetailsProvider albumId={Number(id)}>
      <AlbumDetailsPage />
    </AlbumDetailsProvider>
  );
}

function AlbumDetailsPage() {
  const { isOpen, open, close } = useSimpleModal();
  const { data, breadcrumbItems } = useAlbumDetails();

  return (
    <>
      <Container>
        <Header>
          <ViewToggle />
          <div>
            <ElevatedTextButton onClick={open}>파일 업로드</ElevatedTextButton>
          </div>
        </Header>
        <Breadcrumb items={breadcrumbItems} />
        <Media openModal={open} />
      </Container>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <MediaSelectsProvider initialAlbum={data ? data.album : null}>
          <UploadMediaFormProvider postUpload={close}>
            <UploadMediaForm />
          </UploadMediaFormProvider>
        </MediaSelectsProvider>
      </SimpleModal>
    </>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;
