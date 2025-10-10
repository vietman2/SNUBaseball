import { AlbumForm } from "./form";
import { useCreateAlbumAPI } from "../api/createAlbum";
import { useAlbumForm } from "../contexts/useAlbumForm";

interface Props {
  close: () => void;
}

export function AlbumCreateForm({ close }: Readonly<Props>) {
  const { isReady, payload, resetForm, setErrorMsg } = useAlbumForm();
  const { mutateAsync: createAlbum, isPending } = useCreateAlbumAPI();

  const isButtonDisabled = !isReady || isPending;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) return;

    setErrorMsg("");

    const result = await createAlbum(payload);

    if (result.status === "SUCCESS") {
      resetForm();
      close();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <AlbumForm
      mode="CREATE"
      submit={submit}
      close={close}
      isButtonDisabled={isButtonDisabled}
    />
  );
}
