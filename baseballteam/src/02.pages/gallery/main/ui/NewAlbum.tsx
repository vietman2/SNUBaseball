import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { NewAlbumForm } from "@features/gallery/createNewAlbum";
import { AlbumFormProvider } from "@entities/gallery";
import { useUser } from "@entities/user";
import { ElevatedTextButton } from "@shared/ui/Buttons";

export function NewAlbum() {
  const { isOpen, open, close } = useSimpleModal();
  const { user } = useUser();

  return (
    <>
      <div>
        {user && user.role !== "MEMBER" && (
          <ElevatedTextButton onClick={open}>새 앨범 추가</ElevatedTextButton>
        )}
      </div>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <AlbumFormProvider>
          <NewAlbumForm closeModal={close} />
        </AlbumFormProvider>
      </SimpleModal>
    </>
  );
}
