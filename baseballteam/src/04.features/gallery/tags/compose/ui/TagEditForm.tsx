import { TagForm } from "./form";
import { useUpdateTagAPI } from "../api/updateTag";
import { useTagForm } from "../contexts/useTagForm";
import type { MediaTagType } from "@entities/gallery/tags";

interface Props {
  tag: MediaTagType;
  close: () => void;
}

export function TagEditForm({ tag, close }: Readonly<Props>) {
  const { isReady, payload, resetForm, setErrorMsg } = useTagForm();
  const { mutateAsync: updateTag, isPending } = useUpdateTagAPI(tag.id);

  const isButtonDisabled = !isReady || isPending;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) return;

    setErrorMsg("");

    const result = await updateTag(payload);

    if (result.status === "SUCCESS") {
      resetForm();
      close();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <TagForm
      mode="EDIT"
      submit={submit}
      close={close}
      isButtonDisabled={isButtonDisabled}
    />
  );
}
