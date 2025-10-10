import { AlbumForm } from "./form";
import { useUpdateAlbumAPI } from "../api/updateAlbum";
import { useAlbumForm } from "../contexts/useAlbumForm";
import type { AlbumType } from "@entities/gallery/album";

interface Props {
  album: AlbumType;
  close: () => void;
}

export function AlbumEditForm({ album, close }: Readonly<Props>) {
  const { isReady, payload, resetForm, setErrorMsg } = useAlbumForm();
  const { mutateAsync: updateAlbum, isPending } = useUpdateAlbumAPI(
    album.title
  );
  const isButtonDisabled = !isReady || isPending;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) return;

    setErrorMsg("");

    const result = await updateAlbum(payload);

    if (result.status === "SUCCESS") {
      resetForm();
      close();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <AlbumForm
      mode="EDIT"
      submit={submit}
      close={close}
      isButtonDisabled={isButtonDisabled}
    />
  );
}
