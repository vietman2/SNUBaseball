import { useNavigate } from "react-router";

import { UploadForm } from "./ui/UploadForm";
import { SimpleModalPage } from "@widgets/modal";
import { UploadMediaFormProvider } from "@features/gallery/media/upload";
import { useAlbums } from "@entities/gallery/album";
import { useTags } from "@entities/gallery/tags";
import { FileSelectProvider } from "@shared/lib/files";

export function UploadMedia() {
  const { selectedAlbum } = useAlbums();
  const { selectedTags } = useTags();
  const navigate = useNavigate();

  const goBackToGallery = () => {
    navigate("/gallery", { replace: true });
  };

  return (
    <FileSelectProvider>
      <UploadMediaFormProvider
        initialAlbum={selectedAlbum}
        initialTags={selectedTags}
        postUpload={goBackToGallery}
      >
        <SimpleModalPage onCloseTarget="/gallery">
          <UploadForm />
        </SimpleModalPage>
      </UploadMediaFormProvider>
    </FileSelectProvider>
  );
}
