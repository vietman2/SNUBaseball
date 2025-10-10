import { TagForm } from "./form";
import { useCreateTagAPI } from "../api/createTag";
import { useTagForm } from "../contexts/useTagForm";

interface Props {
  close: () => void;
}

export function TagCreateForm({ close }: Readonly<Props>) {
  const { isReady, payload, resetForm, setErrorMsg } = useTagForm();
  const { mutateAsync: createTag, isPending } = useCreateTagAPI();

  const isButtonDisabled = !isReady || isPending;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) return;

    setErrorMsg("");

    const result = await createTag(payload);

    if (result.status === "SUCCESS") {
      resetForm();
      close();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <TagForm
      mode="CREATE"
      submit={submit}
      close={close}
      isButtonDisabled={isButtonDisabled}
    />
  );
}
