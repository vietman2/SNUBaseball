import styled from "styled-components";

import { Albums } from "./ui/Albums";
import { Breadcrumb } from "@widgets/breadcrumb";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { ViewToggle } from "@widgets/viewtoggle";
import { NewAlbumForm } from "@features/gallery/createNewAlbum";
import { AlbumFormProvider } from "@entities/gallery";
import { useUser } from "@entities/user";
import { type BreadcrumbItemType } from "@shared/lib/views";
import { ElevatedTextButton } from "@shared/ui/Buttons";

export function GalleryMainPage() {
  const { isOpen, open, close } = useSimpleModal();
  const { user } = useUser();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: "앨범 목록",
      href: "/gallery",
    },
  ];

  return (
    <>
      <Container>
        <Header>
          <ViewToggle />
          <div>
            {user && user.role !== "MEMBER" && (
              <ElevatedTextButton onClick={open}>
                새 앨범 추가
              </ElevatedTextButton>
            )}
          </div>
        </Header>
        <Breadcrumb items={breadcrumbItems} />
        <Albums />
      </Container>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <AlbumFormProvider>
          <NewAlbumForm closeModal={close} />
        </AlbumFormProvider>
      </SimpleModal>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;
